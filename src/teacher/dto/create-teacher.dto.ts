import { IsNotEmpty, IsString } from 'class-validator';
import { Subject } from 'src/subject/entities/subject.entity';
export class CreateTeacherDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    subjects: Subject[];

}
