import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService extends CrudService<File>{
  constructor(
    @InjectRepository(File)
    private fileRepository:Repository<File>,
  )
  {
    super(fileRepository);
  }
}
