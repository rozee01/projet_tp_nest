import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { User } from 'src/users/entities/user.entity';
import { ClassModule } from 'src/class/class.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailServerModule } from 'src/email-server/email-server.module';
import { Student } from 'src/student/entities/student.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Teacher, User, Student]),
        forwardRef(() => ClassModule), // Use forwardRef here
        UsersModule,
        EmailServerModule,
    ],
    providers: [TeacherService, AuthService, UsersService, JwtService],
    controllers: [TeacherController],
    exports: [TeacherService],
})
export class TeacherModule {}
