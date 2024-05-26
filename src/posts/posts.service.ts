import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, Repository } from 'typeorm';


@Injectable()
export class PostsService extends CrudService<Post> {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
  
       
    ) {
        super(postRepository);
    }

   /* update(id: string, updateDto: DeepPartial<Post>): Promise<Post> {
        this.eventEmitter.emit('persistence', updateDto);
        return super.update(id, updateDto);
    }*/
}
