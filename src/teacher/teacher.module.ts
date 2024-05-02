import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeachersController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/entities/class.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Teacher, Class])],
    providers: [TeacherService],
    controllers: [TeachersController],
})
export class TeacherModule {}
