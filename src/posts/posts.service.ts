import { EmailServerService } from './../email-server/email-server.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { StudentService } from 'src/student/student.service';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class PostsService extends CrudService<Post> {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly emailServerService: EmailServerService,
        private readonly studentService: StudentService,
        private readonly classService: ClassService,
    ) {
        super(postRepository);
    }
    async create(entity: DeepPartial<Post>): Promise<Post> {
        /*const classDuPost = await this.classService.findOne(entity.class_name.id);
        if (!classDuPost) {
            throw new NotFoundException('class not found');
        }
        const students = classDuPost.students;
        for (const student of students) {
            await this.emailServerService.SendPostMail(student.user.email, student.user.firstName);
        }*/
        const post = super.create(entity);

        return post;
    }
    async findAllByTeacher(teacherId: string): Promise<Post[]> {
        return this.postRepository.find({
            where: { author: { id: teacherId } },
            relations: ['author', 'class_name'], // Include related entities if needed
        });
    }
}
