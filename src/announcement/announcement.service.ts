import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Announcement } from './entities/announcement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnnouncementService extends CrudService<Announcement> {
    constructor(
        @InjectRepository(Announcement)
        private readonly announcementRepository: Repository<Announcement>,
    ) 
    {
        super(announcementRepository);
    }
    
}
