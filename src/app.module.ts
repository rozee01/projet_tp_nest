import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { File } from './files/entities/file.entity';
import { FilesModule } from './files/files.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { Announcement } from './announcement/entities/announcement.entity';
import { SubjectModule } from './subject/subject.module';
import { Subject } from './subject/entities/subject.entity';

@Module({
  imports: [CommonModule, PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '285',
      database: 'ClassroomDb',
      entities: [Post,File,Announcement,Subject],
      synchronize: true,
    }),
    FilesModule,
    AnnouncementModule,
    SubjectModule,
  ],
})
export class AppModule {}
