import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email:string, password:string): Promise<Partial<User>> | undefined | null {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}