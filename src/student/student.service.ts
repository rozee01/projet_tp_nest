import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CrudService } from 'src/common/service/crud.service';

@Injectable()
export class StudentService extends CrudService<Student> {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {
        super(studentRepository);
    }
}
