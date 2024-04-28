import { IsNotEmpty, IsString} from 'class-validator';
import { Teacher } from '../../teacher/entities/teacher.entity';
export class CreateSubjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    isActive : boolean

    @IsNotEmpty()
    teacher : Teacher
}

