import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LogInDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Req() req: Request) {
        return req.user;
    }
}
