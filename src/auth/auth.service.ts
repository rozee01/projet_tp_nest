import { Injectable } from '@nestjs/common';
import { CompareHashAndPass } from 'src/common/utils/bcrypt';
import { UsersService } from 'src/users/users.service';
import { LogInDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser({ email, password }: LogInDTO): Promise<string> | undefined | null {
        const user = await this.usersService.findOnebyEmail(email);
        if (!user) return null;

        const isEqual = CompareHashAndPass(password, user.password, user.salt);

        if (!isEqual) return null;

        const jwtPayload = new JwtPayloadDto(user);
        return this.jwtService.sign(jwtPayload);
    }
}
