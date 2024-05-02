import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { UpdateClassDto } from './dto/update-class.dto';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('class')
export class ClassController {
    constructor(private classService: ClassService) {}
    @Post('')
    create(@Body() createClassDto: CreateClassDto) {
        return this.classService.create(createClassDto);
    }
    @Get()
    findAll() {
        return this.classService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
        return this.classService.update(id, updateClassDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.classService.remove(id);
    }
}
