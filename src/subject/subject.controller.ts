import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Post()
    @UseGuards(JWTGuard)
    create(@UserDecorator() user: JwtPayloadDto, @Body() createSubjectDto: CreateSubjectDto) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.subjectService.create(createSubjectDto);
    }

    @Get()
    findAll() {
        return this.subjectService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subjectService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JWTGuard)
    update(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();

        return this.subjectService.update(id, updateSubjectDto);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();

        return this.subjectService.remove(id);
    }
}
