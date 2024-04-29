import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { File } from './files/entities/file.entity';
import { FilesModule } from './files/files.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { Announcement } from './announcement/entities/announcement.entity';
import { ClassModule } from './class/class.module';
import { Class } from './class/entities/class.entity';

@Module({
  imports: [
    CommonModule,
    PostsModule,
    ClassModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'ClassroomDb', 
      entities: [Post, File, Announcement, Class],
      synchronize: true,
    }),
    FilesModule,
    AnnouncementModule,
    ClassModule,
  ],
})
export class AppModule {}
