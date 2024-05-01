import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { User } from 'src/users/entities/user.entity';

export class JwtPayloadDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsEnum(RoleEnum)
    @IsNotEmpty()
    role: RoleEnum;

    constructor(partial: Partial<User>) {
        if (!partial.id || !partial.email || !partial.role) {
            throw new Error('Required fields are missing from the user data.');
        }

        this.id = partial.id;
        this.email = partial.email;
        this.role = partial.role;
    }
}
