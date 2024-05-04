import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalGuard } from './guard/local.guard';
import { SignUpDTO } from './dto/signup.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req: Request) {
        return req.user;
    }

    // Temporary to create first admin
    @Post('signup/admin')
    async signupA(@Body() signUp: SignUpDTO) {
        const { valid, err } = await this.authService.checkValid(signUp);
        if (!valid) {
            if (!err) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            throw err;
        }
        const result = await this.authService.CreateUser(signUp, RoleEnum.ADMIN);
        if (!result) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        if (!result.valid) {
            if (!result.err) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            throw result.err;
        }
        return result.valid;
    }
}
