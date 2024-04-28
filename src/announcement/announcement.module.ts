import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { Announcement } from './entities/announcement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  imports:[TypeOrmModule.forFeature([Announcement])]
})
export class AnnouncementModule {}
