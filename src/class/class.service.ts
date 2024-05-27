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
import { UUID } from 'crypto';

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

    async createClass(createClassDto: CreateClassDto,teacherId: string): Promise<Class> {
        const teacher = await this.teacherService.findOne(teacherId);

        if (!teacher) {
            throw new NotFoundException(`Teacher not found`);
        }
        console.log('teacher:', teacher);

        const classEntity = this.classRepository.create(createClassDto);
        void this.teacherService.linkClassToTeacher(teacher.id, classEntity.id);
        return this.classRepository.save(classEntity);
    }

    async enroll(classId: string, studentId: string): Promise<void> {
      const classInstance = await this.classRepository.findOne({ 
          where: { id: classId },
          relations: ['students'],
      });
      const student = await this.studentService.findOne(studentId);

      // Check class and student
      if (!classInstance || !student) {
          throw new NotFoundException('Class or student not found');
      }

      // Check if the student is already enrolled in the class
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
    async findByName(class_name: string): Promise<Class | null> {
        const classes = await this.classRepository.find({ where: { class_name } });
        if (classes.length === 0) {
          return null; // Not found
        } else if (classes.length === 1) {
          return classes[0]; // Return the first result
        } else {
          // Handle multiple results (possibly an error or ambiguous situation)
          // You may throw an error, log a warning, or handle it in any other way suitable for your application
          console.warn(`Multiple classes found with name '${class_name}'`);
          return classes[0]; // Return the first result
        }    }
}
