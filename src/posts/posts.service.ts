import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService extends CrudService<Post> {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {
        super(postRepository);
    }
}
