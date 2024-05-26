import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FileUploadService } from 'src/common/service/file-upload.service';
import { StudentModule } from 'src/student/student.module';
import { ClassModule } from 'src/class/class.module';
import { EmailServerModule } from 'src/email-server/email-server.module';
import { TeacherService } from 'src/teacher/teacher.service';
import { ClassService } from 'src/class/class.service';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]), 
        forwardRef(() => ClassModule), 
        EmailServerModule, 
        forwardRef(() => TeacherModule),
        forwardRef(() => StudentModule)
    ],
    controllers: [PostsController],
    providers: [PostsService, FileUploadService],
    exports: [PostsService],
})
export class PostsModule {}
