import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    class_name: string;
}
