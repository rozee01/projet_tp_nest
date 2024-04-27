import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { Files } from './posts/entities/file.entity';
import { AnnouncementModule } from './announcement/announcement.module';
import { Announcement } from './announcement/entities/announcement.entity';

@Module({
  imports: [CommonModule, PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'ClassroomDb',
      entities: [Post,Files,Announcement],
      synchronize: true,
    }),
    AnnouncementModule,
  ],
})
export class AppModule {}
