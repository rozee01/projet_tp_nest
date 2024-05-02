import { Controller, Get, Post, Patch, Param, Delete, Body } from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';

@Controller('student-class')
export class StudentClassController {
    constructor(private readonly studentClassService: StudentClassService) {}

    @Post()
    create(@Body() createStudentClassDto: CreateStudentClassDto) {
        console.log(createStudentClassDto);
        return this.studentClassService.create(createStudentClassDto);
    }

    @Get()
    findAll() {
        return this.studentClassService.findAll();
    }

    @Get(':studentId/:classId')
    findOne(@Param('studentId') studentId: string, @Param('classId') classId: string) {
        return this.studentClassService.findOne(studentId, classId);
    }

    @Patch(':studentId/:classId')
    update(
        @Param('studentId') studentId: string,
        @Param('classId') classId: string,
        @Body() updateStudentClassDto: UpdateStudentClassDto,
    ) {
        return this.studentClassService.update(studentId, classId, updateStudentClassDto);
    }

    @Delete(':studentId/:classId')
    remove(@Param('studentId') studentId: string, @Param('classId') classId: string) {
        return this.studentClassService.remove(studentId, classId);
    }
}
