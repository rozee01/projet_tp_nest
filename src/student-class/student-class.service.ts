import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';
import { StudentClass } from './entities/studentclass.entity';

@Injectable()
export class StudentClassService {
    constructor(
        @InjectRepository(StudentClass)
        private readonly studentClassRepository: Repository<StudentClass>,
    ) {}

    async create(createStudentClassDto: CreateStudentClassDto): Promise<StudentClass> {
        const newStudentClass = this.studentClassRepository.create(createStudentClassDto);
        return this.studentClassRepository.save(newStudentClass);
    }

    async findAll(): Promise<StudentClass[]> {
        return this.studentClassRepository.find();
    }

    async findOne(studentId: string, classId: string): Promise<StudentClass> {
        const studentClass = await this.studentClassRepository.findOne({
            where: { student_id: studentId, class_id: classId },
        });
        if (!studentClass) {
            throw new NotFoundException(`StudentClass with Student ID ${studentId} and Class ID ${classId} not found.`);
        }
        return studentClass;
    }

    async update(
        studentId: string,
        classId: string,
        updateStudentClassDto: UpdateStudentClassDto,
    ): Promise<StudentClass> {
        const existingStudentClass = await this.findOne(studentId, classId);
        if (!existingStudentClass) {
            throw new NotFoundException(
                `Cannot update: StudentClass with Student ID ${studentId} and Class ID ${classId} not found.`,
            );
        }
        const updatedStudentClass = Object.assign(existingStudentClass, updateStudentClassDto);
        return this.studentClassRepository.save(updatedStudentClass);
    }

    async remove(studentId: string, classId: string): Promise<void> {
        const studentClass = await this.findOne(studentId, classId);
        if (!studentClass) {
            throw new NotFoundException(
                `Cannot remove: StudentClass with Student ID ${studentId} and Class ID ${classId} not found.`,
            );
        }
        await this.studentClassRepository.remove(studentClass);
    }
}
