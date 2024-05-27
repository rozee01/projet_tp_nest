import { EmailServerService } from './../email-server/email-server.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from 'src/common/service/crud.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { StudentService } from 'src/student/student.service';
import { ClassService } from 'src/class/class.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class PostsService extends CrudService<Post> {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly emailServerService: EmailServerService,
        private readonly studentService: StudentService,
        private readonly classService: ClassService,
        private readonly teacherService: TeacherService,
    ) {
        super(postRepository);
    }
    async create(entity: DeepPartial<Post>): Promise<Post> {
        const classDuPost = await this.classService.findByName(entity.className.class_name);

        if (!classDuPost) {
            throw new NotFoundException('class not found');
        }

        const students = classDuPost.students;
        console.log(students);
        for (const student of students) {
            await this.emailServerService.SendPostMail(
                student.user.email,
                student.user.firstName,
                classDuPost.class_name,
            );
        }
        const post = await super.create(entity);

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

    async findAllByTeacher(teacherId: string): Promise<Post[]> {
        const teacher = await this.teacherService.findOne(teacherId);

        if (!teacher) {
            throw new Error('Teacher not found');
        }

        const posts = teacher.classesTaught.flatMap((classEntity) => classEntity.posts);
        return posts;
    }
}
