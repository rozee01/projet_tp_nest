import { Controller, Get, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get('')
    @UseGuards(JWTGuard)
    async getAllUsers(@UserDecorator() user: JwtPayloadDto): Promise<User[] | null> {
        if (user.role != RoleEnum.ADMIN) throw new UnauthorizedException();
        return await this.userService.findAll();
    }

    @Get(':id')
    @UseGuards(JWTGuard)
    async getUser(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string): Promise<User | null> {
        if (user.id == id || user.role === RoleEnum.ADMIN) return await this.userService.findOne(id);
        throw new UnauthorizedException();
    }
}
