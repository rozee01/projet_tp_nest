import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { StudentModule } from 'src/student/student.module';
import { StudentService } from 'src/student/student.service';

@Module({
    controllers: [ClassController],
    providers: [ClassService ],
    imports: [TypeOrmModule.forFeature([Class]) ,TeacherModule, StudentModule],
    exports: [ClassService],
})
export class ClassModule {}
