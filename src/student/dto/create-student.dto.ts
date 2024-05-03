import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    password: string;
}
