import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsOptional()
    files?: string[];
}
