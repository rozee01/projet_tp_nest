import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompareHashAndPass, GetHashAndSalt } from 'src/common/utils/bcrypt';
import { UsersService } from 'src/users/users.service';
import { LogInDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { User } from 'src/users/entities/user.entity';
import { SignUpDTO } from './dto/signup.dto';
import { verifyEmail } from '@devmehq/email-validator-js';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser({ email, password }: LogInDTO): Promise<string | null> {
        const user = await this.usersService.findOnebyEmail(email);
        if (!user) return null;

        const isEqual = CompareHashAndPass(password, user.password, user.salt);
        if (!isEqual) return null;

        const jwtPayload = new JwtPayloadDto(user);
        return this.jwtService.sign({ ...jwtPayload });
    }

    async checkUser(id: string): Promise<User | null> {
        const user = await this.usersService.findOne(id);
        return user;
    }
    async checkValid(signUp: SignUpDTO): Promise<{ valid: boolean; err: HttpException | null }> {
        //  prevents spammers from signing up using disposable email
        // prevent fake people from registering
        // Uses the library "deep-email-validator"
        const ValidationResult = verifyEmail({
            emailAddress: signUp.email,
            verifyMx: true,
            verifySmtp: true,
            timeout: 3000,
        });
        const user = this.usersService.findOnebyEmail(signUp.email);
        const { validFormat, validSmtp, validMx } = await ValidationResult;
        if (!validFormat || !validMx || !validSmtp) {
            return {
                valid: false,
                err: new HttpException(
                    {
                        message: 'Please provide a valid email address.',
                        reason: 'Email Format is wrong or email not found',
                    },
                    HttpStatus.BAD_REQUEST,
                ),
            };
        }
        if (await user) {
            return {
                valid: false,
                err: new HttpException(
                    {
                        message: 'username used',
                    },
                    HttpStatus.BAD_REQUEST,
                ),
            };
        }
        return { valid: true, err: null };
    }
    async CreateUser(signUp: SignUpDTO, role: RoleEnum): Promise<{ valid: boolean; err: Error | null; user: User }> {
        try {
            const { password, salt } = GetHashAndSalt(signUp.password);
            const user = await this.usersService.create({ ...signUp, password, salt, role });
            if (!user) throw new Error("Couldn't Create User");
            return { valid: true, err: null, user };
        } catch (err) {
            return { valid: false, err: err as Error, user: null };
        }
    }
}
