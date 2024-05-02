/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Teacher } from './entities/teacher.entity';
import { Class } from '../class/entities/class.entity'; // Import the Class entity
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Injectable()
export class TeacherService extends CrudService<Teacher> {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(Class)
        private classRepository: Repository<Class>, // Inject the Class repository
    ) {
        super(teacherRepository);
    }

    async create(teacherData: Partial<Teacher>): Promise<Teacher> {
        teacherData.role = RoleEnum.TEACHER;
        teacherData.classesTaught = [];
        return super.create(teacherData);
    }

    async linkClassToTeacher(teacherId: string, classId: string): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });

        if (!teacher) {
            throw new NotFoundException('Teacher not found');
        }
        if (!teacher.classesTaught) {
            teacher.classesTaught = [];
        }

        const classEntity = await this.classRepository.findOne({ where: { id: classId } });
        if (!classEntity) {
            throw new NotFoundException('Class not found');
        }

        // Link the class to the teacher
        teacher.classesTaught.push(classEntity);

        // Save the updated teacher entity
        return this.teacherRepository.save(teacher);
    }
}
