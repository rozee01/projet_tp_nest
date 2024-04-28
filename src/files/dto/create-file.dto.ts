import {  IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateFileDto {
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;
    @IsString()
    nom:string;
}
