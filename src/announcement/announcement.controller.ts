import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UnauthorizedException,
    Sse,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { eventType } from 'src/common/eventType';

@Controller('announcement')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService /*private eventEmitter: EventEmitter2*/) {}

    /* @Sse('sse')
    sse(): Observable<MessageEvent> {
        return fromEvent(this.eventEmitter, 'persistence').pipe(
          filter((payload): payload is eventType => payload.hasOwnProperty('post') && payload.hasOwnProperty('user') && payload.hasOwnProperty('action') && payload.hasOwnProperty('class')),
          map((payload: eventType) => {
            console.log('payload', payload);
          return new MessageEvent('persistence event', { data: payload });
          }),
        );
      }
    */
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
