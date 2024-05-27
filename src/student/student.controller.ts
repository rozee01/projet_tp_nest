import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
    UseGuards,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SignUpDTO } from 'src/auth/dto/signup.dto';
import { AuthService } from 'src/auth/auth.service';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { Student } from './entities/student.entity';
import { StudentSignUpDTO } from 'src/auth/dto/studentsignup.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('students')
export class StudentController {
    constructor(
        private readonly studentsService: StudentService,
        private readonly authService: AuthService,
        private readonly postsService: PostsService,
    ) {}

    @UseGuards(JWTGuard)
    @Get(':id/posts')
    async getStudentPosts(@Param('id') studentId: string) {
        return this.postsService.findPostsByStudentId(studentId);
    }

    @Post()
    async create(@Body() signUp: StudentSignUpDTO) {
        const { valid, err } = await this.authService.checkValid(signUp);
        if (!valid) {
            if (!err) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            throw err;
        }
        const result = await this.authService.CreateUser(signUp, RoleEnum.STUDENT);
        if (!result) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (!result.valid) {
            if (!result.err) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            throw result.err;
        }
        return this.studentsService.create({ user: result.user });
    }
    @Get()
    @UseGuards(JWTGuard)
    findAll() {
        return this.studentsService.findAll();
    }

    @Get(':id')
    @UseGuards(JWTGuard)
    findOne(@Param('id') id: string) {
        return this.studentsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JWTGuard)
    update(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string, @Body() updateStudentDto: Partial<Student>) {
        if (user.role != RoleEnum.ADMIN && user.id != id)
            throw new UnauthorizedException('You do not have permission to update this student.');
        return this.studentsService.update(id, updateStudentDto);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string) {
        if (user.role != RoleEnum.ADMIN && user.id != id)
            throw new UnauthorizedException('You are not allowed to delete this student.');
        return this.studentsService.remove(id);
    }
}
