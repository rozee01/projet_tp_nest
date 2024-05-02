/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/service/crud.service';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService extends CrudService<Class> {
    constructor(
        @InjectRepository(Class)
        private classRepository: Repository<Class>,
    ) {
        super(classRepository);
    }
}
