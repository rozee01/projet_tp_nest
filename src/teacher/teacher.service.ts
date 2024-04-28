import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService extends CrudService<Teacher>{
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository:Repository<Teacher>,
  )
  {
    super(teacherRepository);
  }
}
