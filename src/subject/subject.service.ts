import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Subject } from './entities/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService extends CrudService<Subject> {
    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>,
    ) {
        super(subjectRepository);
    }
}
