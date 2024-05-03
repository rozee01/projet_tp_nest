import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';

@Module({
    providers: [StudentService],
    controllers: [StudentController],
    imports: [TypeOrmModule.forFeature([Student]), AuthService],
})
export class StudentModule {}
