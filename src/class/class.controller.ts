import { Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { UpdateClassDto } from './dto/update-class.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Controller('class')
export class ClassController {
    constructor(private classService: ClassService) {}
    @Post('')
    @UseGuards(JWTGuard)
    create(@UserDecorator() user: JwtPayloadDto, @Body() createClassDto: CreateClassDto) {
        if (user.role == RoleEnum.TEACHER || user.role == RoleEnum.ADMIN) {
        return this.classService.createClass(createClassDto);}
        throw new UnauthorizedException();
    }
    @Get()
    findAll() {
        return this.classService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JWTGuard)
    update(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.classService.update(id, updateClassDto);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.classService.remove(id);
    }
}
