import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsUUID()
    classId: string

    // @IsArray()
    // @IsOptional()
    // files: string[];
}
