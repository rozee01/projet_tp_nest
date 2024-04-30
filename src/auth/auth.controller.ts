import { Body, Controller, Post } from '@nestjs/common';
import { LogInDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() loginInfo: LogInDTO) {
        return await this.authService.validateUser(loginInfo);
    }
}
