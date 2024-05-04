import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { SignUpDTO } from 'src/auth/dto/signup.dto';
import { AuthService } from 'src/auth/auth.service';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { Teacher } from './entities/teacher.entity';
@Controller('teachers')
export class TeacherController {
    constructor(
        private readonly teachersService: TeacherService,
        private readonly authService: AuthService,
    ) {}

    @Post('')
    async create(@Body() signUp: SignUpDTO) {
        const { valid, err } = await this.authService.checkValid(signUp);
        if (!valid) {
            if (!err) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            throw err;
        }
        const result = await this.authService.CreateUser(signUp, RoleEnum.TEACHER);
        if (!result) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (!result.valid) {
            if (!result.err) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            throw result.err;
        }
        return this.teachersService.create({ user: result.user });
    }
    @Get()
    @UseGuards(JWTGuard)
    findAll() {
        return this.teachersService.findAll();
    }

    @Get(':id')
    @UseGuards(JWTGuard)
    findOne(@Param('id') id: string) {
        return this.teachersService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JWTGuard)
    async update(
        @UserDecorator() user: JwtPayloadDto,
        @Param('id') id: string,
        @Body() updateData: Partial<Teacher>,
    ): Promise<Teacher> {
        if (user.role !== RoleEnum.ADMIN && user.id !== id) {
            throw new UnauthorizedException('You do not have permission to perform this operation.');
        }
        return this.teachersService.update(id, updateData);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string) {
        if (user.role != RoleEnum.ADMIN && user.id !== id)
            throw new UnauthorizedException('Only admins can delete a teacher. Or the teacher can delete himself');
        return this.teachersService.remove(id);
    }

    @Post('link-class')
    async linkClassToTeacher(@Body() link: { teacherId: string; classId: string }): Promise<Teacher> {
        return this.teachersService.linkClassToTeacher(link.teacherId, link.classId);
    }
}
