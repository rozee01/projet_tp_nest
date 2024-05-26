import { EmailServerService } from './../email-server/email-server.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { StudentService } from 'src/student/student.service';
import { ClassService } from 'src/class/class.service';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class PostsService extends CrudService<Post> {
    findAllByTeacher(teacherId: string) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>,
        private readonly emailServerService: EmailServerService,
        private readonly studentService: StudentService,
        private readonly classService: ClassService,
    ) {
        super(postRepository);
    }
    async create(entity: DeepPartial<Post>): Promise<Post> {
        const classDuPost = await this.classService.findOne(entity.className.id);
        if (!classDuPost) {
            throw new NotFoundException('class not found');
        }
        const students = classDuPost.students;
        for (const student of students) {
            await this.emailServerService.SendPostMail(student.user.email, student.user.firstName, classDuPost.class_name);
        }
        const post = super.create(entity);

        return post;
    }
    async findPostsByStudentId(studentId: string): Promise<Post[]> {
        const student = await this.studentService.findOne({
            where: { id: studentId },
            relations: ['classes', 'classes.posts', 'classes.posts.author', 'classes.posts.className'],
        });

        if (!student) {
            throw new Error('Student not found');
        }

        const posts = student.classes.flatMap((classEntity) => classEntity.posts);
        return posts;
    }
}
