import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Controller('announcement')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) {}

    @Post()
    @UseGuards(JWTGuard)
    create(@UserDecorator() user: JwtPayloadDto, @Body() createAnnouncementDto: CreateAnnouncementDto) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.announcementService.create(createAnnouncementDto);
    }

    @Get()
    findAll() {
        return this.announcementService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.announcementService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JWTGuard)
    update(
        @UserDecorator() user: JwtPayloadDto,
        @Param('id') id: string,
        @Body() updateAnnouncementDto: UpdateAnnouncementDto,
    ) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.announcementService.update(id, updateAnnouncementDto);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.announcementService.remove(id);
    }
}
