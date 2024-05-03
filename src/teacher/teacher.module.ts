import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/entities/class.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Teacher, Class]), AuthService],
    providers: [TeacherService],
    controllers: [TeacherController],
})
export class TeacherModule {}
