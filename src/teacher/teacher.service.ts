import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Teacher } from './entities/teacher.entity';
import { Class } from '../class/entities/class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TeacherService extends CrudService<Teacher> {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>,
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>,
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
    ) {
        super(teacherRepository);
    }

    async create(teacherData: Partial<Teacher>): Promise<Teacher> {
        if (!teacherData.user || teacherData.user.role !== RoleEnum.TEACHER) {
            throw new NotFoundException('User must have the teacher role to be assigned as a teacher');
        }
        teacherData.classesTaught = []; // Initialize with an empty array
        return super.create(teacherData);
    }

    async linkClassToTeacher(teacherId: string, classId: string): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne({
            where: { id: teacherId },
            relations: ['classesTaught'], // Ensure classesTaught is loaded
        });

        if (!teacher) {
            throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
        }

        const classEntity = await this.classRepository.findOne({ where: { id: classId } });
        if (!classEntity) {
            throw new NotFoundException(`Class with ID ${classId} not found`);
        }

        // Link the class to the teacher
        teacher.classesTaught.push(classEntity);

        // Save the updated teacher entity
        return this.teacherRepository.save(teacher);
    }
 
}
