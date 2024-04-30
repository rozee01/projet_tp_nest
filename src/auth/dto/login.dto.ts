import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LogInDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}