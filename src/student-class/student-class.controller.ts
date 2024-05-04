import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
    Body,
    UseGuards,
    UnauthorizedException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Controller('student-classes')
export class StudentClassController {
    constructor(private readonly studentClassService: StudentClassService) {}

    @Post()
    @UseGuards(JWTGuard)
    create(@Body() createStudentClassDto: CreateStudentClassDto) {
        return this.studentClassService.create(createStudentClassDto);
    }

    @Get()
    @UseGuards(JWTGuard)
    findAll() {
        return this.studentClassService.findAll();
    }

    @Get(':studentId/:classId')
    @UseGuards(JWTGuard)
    findOne(@Param('studentId') studentId: string, @Param('classId') classId: string) {
        return this.studentClassService.findOne(studentId, classId);
    }

    @Patch(':studentId/:classId')
    @UseGuards(JWTGuard)
    update(
        @UserDecorator() user: JwtPayloadDto,
        @Param('studentId') studentId: string,
        @Param('classId') classId: string,
        @Body() updateStudentClassDto: UpdateStudentClassDto,
    ) {
        if (user.role !== RoleEnum.ADMIN) {
            throw new UnauthorizedException('Insufficient permission to update student-class relationships.');
        }
        return this.studentClassService.update(studentId, classId, updateStudentClassDto);
    }

    @Delete(':studentId/:classId')
    @UseGuards(JWTGuard)
    remove(
        @UserDecorator() user: JwtPayloadDto,
        @Param('studentId') studentId: string,
        @Param('classId') classId: string,
    ) {
        if (user.role !== RoleEnum.ADMIN) {
            throw new UnauthorizedException('Insufficient permission to delete student-class relationships.');
        }
        return this.studentClassService.remove(studentId, classId);
    }
}
