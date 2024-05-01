import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service'; // Import the service
import { CreateTeacherDto } from './dtos/create-teacher.dto'; // Import DTOs as needed
import { UpdateTeacherDto } from './dtos/update-teacher.dto';

@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService: TeacherService) {}

    @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teachersService.create(createTeacherDto);
    }

    @Get()
    findAll() {
        return this.teachersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teachersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
        return this.teachersService.update(id, updateTeacherDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.teachersService.remove(id);
    }
     @Post('link-class')
    async linkClassToTeacher(@Body() body:{ teacherId : string , classId : string}) {
        return this.teachersService.linkClassToTeacher(body.teacherId, body.classId);
    }
    
}
