import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FileUploadService } from 'src/common/service/file-upload.service';

@Module({
    controllers: [PostsController],
    providers: [PostsService, FileUploadService],
    imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
