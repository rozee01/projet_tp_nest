import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Teacher } from '../../teacher/entities/teacher.entity';

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    class_name: string;
}
