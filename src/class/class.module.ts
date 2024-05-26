import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class } from './entities/class.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { Student } from 'src/student/entities/student.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Class, Student]),
        forwardRef(() => TeacherModule), // Use forwardRef here
        StudentModule,
    ],
    providers: [ClassService],
    controllers: [ClassController],
    exports: [ClassService],
})
export class ClassModule {}