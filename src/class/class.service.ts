/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/service/crud.service';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from '../student/student.service';

@Injectable()
export class ClassService extends CrudService<Class> {
    constructor(
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>,
       
        private readonly teacherService: TeacherService,
        private readonly studentService : StudentService,
        
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

    async enroll(classId: string, studentId: string): Promise<void> {
            
            const classInstance = await super.findOne(classId);
            const student = await this.studentService.findOne(studentId);
        
            // Check class and student
            if (!(classInstance && student)) {
              throw new Error('Class or student not found');
            }
        
            // Check if the student fel class
            const isEnrolled = classInstance.students.some(
              (enrolledStudent) => enrolledStudent.id === studentId,
            );
            if (isEnrolled) {
              throw new Error('Student is already enrolled in the class');
            }
        
            // Enroll the student in the class
            classInstance.students.push(student);
        
           
            await this.classRepository.save(classInstance);
          
    }
    async findByName(class_name: string): Promise<Class> {
      return this.classRepository.findOne({ where: { class_name } });
    }
}
