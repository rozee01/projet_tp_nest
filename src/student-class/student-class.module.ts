import { Module } from '@nestjs/common';
import { StudentClassController } from './student-class.controller';
import { StudentClassService } from './student-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentClass } from './entities/studentclass.entity';

@Module({
    controllers: [StudentClassController],
    providers: [StudentClassService],
    imports: [TypeOrmModule.forFeature([StudentClass])],
})
export class StudentClassModule {}
