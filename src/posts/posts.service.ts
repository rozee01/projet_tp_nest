import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService extends CrudService<Post> {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private eventEmitter: EventEmitter2,
    ) {
        super(postRepository);
    }
    create(post: CreatePostDto) {
        this.eventEmitter.emit('persistence', post);
        return super.create(post);
    }
}
