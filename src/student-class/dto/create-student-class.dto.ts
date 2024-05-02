import { IsString } from 'class-validator';

export class CreateStudentClassDto {
    @IsString()
    student_id: string;

    @IsString()
    class_id: string;
}
