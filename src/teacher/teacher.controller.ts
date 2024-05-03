import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpStatus,
    HttpException,
    UnauthorizedException,
} from '@nestjs/common';
import { TeacherService } from './teacher.service'; // Import the service
import { CreateTeacherDto } from './dtos/create-teacher.dto'; // Import DTOs as needed
import { UpdateTeacherDto } from './dtos/update-teacher.dto';
import { SignUpDTO } from 'src/auth/dto/signup.dto';
import { AuthService } from 'src/auth/auth.service';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';

@Controller('teacher')
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
        const res = await this.teachersService.create({ ...signUp, role: RoleEnum.TEACHER });
        if (!res) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        return res;
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
    update(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
        if (user.role != RoleEnum.ADMIN && user.id != id) throw new UnauthorizedException();
        return this.teachersService.update(id, updateTeacherDto);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string) {
        if (user.role != RoleEnum.ADMIN) throw new UnauthorizedException();
        return this.teachersService.remove(id);
    }
    @Post('link-class')
    async linkClassToTeacher(@Body() body: { teacherId: string; classId: string }) {
        return this.teachersService.linkClassToTeacher(body.teacherId, body.classId);
    }
}
