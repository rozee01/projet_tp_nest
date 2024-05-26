import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FileUploadService } from 'src/common/service/file-upload.service';
import { StudentModule } from 'src/student/student.module';
import { ClassModule } from 'src/class/class.module';
import { EmailServerModule } from 'src/email-server/email-server.module';

@Module({
    controllers: [PostsController],
    providers: [PostsService, FileUploadService],
    imports: [TypeOrmModule.forFeature([Post]), StudentModule, ClassModule, EmailServerModule],
})
export class PostsModule {}
