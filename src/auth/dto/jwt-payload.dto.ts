import { User } from 'src/users/entities/user.entity';

export class JwtPayloadDto {
    id: string;
    email: string;
    role: string;

    constructor(partial: Partial<User>) {
        if (!partial.id || !partial.email || !partial.role) {
            throw new Error('Required fields are missing from the user data.');
        }

        this.id = partial.id;
        this.email = partial.email;
        this.role = partial.role;
    }
}
