import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @UseGuards(JWTGuard)
    create(@UserDecorator() user: JwtPayloadDto, @Body() createPostDto: CreatePostDto) 
    {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.postsService.create(createPostDto);
    }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JWTGuard)
    update(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string)
     {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.postsService.remove(id);
    }
}
