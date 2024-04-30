import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalGuard } from './guard/local.guard';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req: Request) {
        return req.user;
    }
}
