import { IsNotEmpty, IsString } from 'class-validator';
export class CreateSubjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    isActive: boolean;
}
