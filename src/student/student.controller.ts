import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service'; // Import the service
import { CreateStudentDto } from './dto/create-student.dto'; // Import DTOs as needed
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentService) {}

    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        // Use the appropriate DTO
        return this.studentsService.create(createStudentDto);
    }

    @Get()
    findAll() {
        return this.studentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentsService.update(id, updateStudentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.studentsService.remove(id);
    }
}
