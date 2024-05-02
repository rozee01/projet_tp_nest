import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentsController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [StudentService],
    controllers: [StudentsController],
    imports: [TypeOrmModule.forFeature([Student])],
})
export class StudentModule {}
