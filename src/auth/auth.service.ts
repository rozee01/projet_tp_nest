import { Injectable } from '@nestjs/common';
import { CompareHashAndPass } from 'src/common/utils/bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService:UsersService){}

    async validateUser(email : string, password: string): Promise<Partial<User>> | undefined | null{
        const user = await this.usersService.findOnebyEmail(email);
        if(user){
            const isEqual = CompareHashAndPass(password,user.password,user.salt);
            if(!isEqual) return null;
            return user; // TODO CHANGE THIS WITH DTOOOOO
        }
        return null;
    }
}
