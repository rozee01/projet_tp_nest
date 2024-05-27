import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PostsModule } from 'src/posts/posts.module';

@Module({
    imports: [TypeOrmModule.forFeature([Student, User]), forwardRef(() => PostsModule)],
    controllers: [StudentController],
    providers: [StudentService, AuthService, UsersService, JwtService],
    exports: [StudentService],
})
export class StudentModule {}
