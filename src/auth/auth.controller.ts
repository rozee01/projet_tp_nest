import { Body, Controller, Post } from '@nestjs/common';
import { LogInDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    @Post("login")
    login(@Body() loginInfo: LogInDTO){

    }
}
