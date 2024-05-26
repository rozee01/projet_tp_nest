import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ActionEnum } from 'src/common/enum/action.enum';

@Injectable()
export class PostsService extends CrudService<Post> {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private eventEmitter: EventEmitter2,
    ) {
        super(postRepository);
    }
    async create(post: CreatePostDto) {
        var p=await this postRepository.save(post);
             this.eventEmitter.emit('persistence', 
            {
                post: post,
                user: p.author,
                action:ActionEnum.CREATE
            }
        );
        return p;
        
    }
    update(id: string, updateDto: DeepPartial<Post>): Promise<Post> {
        this.eventEmitter.emit('persistence', updateDto);
        return super.update(id, updateDto);
    }
}
