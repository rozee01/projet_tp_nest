import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post()
    @UseGuards(JWTGuard)
    create(@UserDecorator() user: JwtPayloadDto, @Body() createFileDto: CreateFileDto) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.filesService.create(createFileDto);
    }

    @Get()
    findAll() {
        return this.filesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.filesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JWTGuard)
    update(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.filesService.update(id, updateFileDto);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.filesService.remove(id);
    }
}
