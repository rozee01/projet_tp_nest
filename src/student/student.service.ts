import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CrudService } from 'src/common/service/crud.service';
import { RoleEnum } from 'src/common/enum/roles.enum'; // Import RoleEnum if not already imported

@Injectable()
export class StudentService extends CrudService<Student> {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {
        super(studentRepository);
    }

    async create(studentData: Partial<Student>): Promise<Student> {
        // Check if the user object exists and if the role is set to STUDENT
        if (!studentData.user || studentData.user.role !== RoleEnum.STUDENT) {
            throw new NotFoundException('User must have the student role to be assigned as a student');
        }
        studentData.classes = [];
        return super.create(studentData);
    }
}
