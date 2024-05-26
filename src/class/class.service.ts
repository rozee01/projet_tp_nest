import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/service/crud.service';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class ClassService extends CrudService<Class> {
    constructor(
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>,
        private readonly teacherService: TeacherService,
    ) {
        super(classRepository);
    }
    async createClass(createClassDto: CreateClassDto): Promise<Class> {
        const teacher = await this.teacherService.findOne(createClassDto.teacherId);

        if (!teacher) {
            throw new NotFoundException(`Teacher not found`);
        }

        const classEntity = this.classRepository.create({ class_name: createClassDto.class_name, teacher });
        return this.classRepository.save(classEntity);
    }
}
