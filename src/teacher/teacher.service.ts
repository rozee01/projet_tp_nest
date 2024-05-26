import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Teacher } from './entities/teacher.entity';
import { Class } from '../class/entities/class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { User } from 'src/users/entities/user.entity';
import { ClassService } from 'src/class/class.service';
import { CreateClassDto } from 'src/class/dto/create-class.dto';
import { EmailServerService } from '../email-server/email-server.service';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class TeacherService extends CrudService<Teacher> {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>,
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @Inject(forwardRef(() => ClassService)) // Use forwardRef here
        private readonly classService: ClassService,
        private readonly emailServerService: EmailServerService,
    ) {
        super(teacherRepository);
    }

    async createClassForLevel(createClassDto: CreateClassDto, teacherId: string): Promise<Class> {
        const teacher = await this.teacherRepository.findOne({
            where: { id: teacherId },
            relations: ['classesTaught'],
        });
        if (!teacher) {
            throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
        }

        const students = await this.studentRepository.find({
            where: { level: createClassDto.level },
            relations: ['user'],
        });
        console.log(students);
        if (students.length === 0) {
            console.log('no students in taht level');
        }

        const newClass = await this.classService.createClass(createClassDto, teacherId);

        for (const student of students) {
            await this.classService.enroll(newClass.id, student.id);

            await this.emailServerService.SendPostMail(student.user.email, student.user.firstName, newClass.class_name);
        }

        return newClass;
    }
    findOne(Id: string): Promise<Teacher> {
        return this.teacherRepository.findOne({ where: { id: Id }, relations: ['classesTaught'] });
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

        const classEntity = await this.classService.findOne(classId);
        if (!classEntity) {
            throw new NotFoundException(`Class with ID ${classId} not found`);
        }

        // Link the class to the teacher
        teacher.classesTaught.push(classEntity);

        // Save the updated teacher entity
        return this.teacherRepository.save(teacher);
    }
}
