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
    Res,
    UseInterceptors,
    UploadedFile,
    Req,
    StreamableFile,
    NotFoundException,
    UploadedFiles,
} from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { join } from 'path';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/common/service/file-upload.service';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ActionEnum } from 'src/common/enum/action.enum';
import { Class } from 'src/class/entities/class.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { ClassService } from 'src/class/class.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly teacherService:TeacherService,
        private readonly classService: ClassService,
        private readonly filesService: FileUploadService,
       // private eventEmitter: EventEmitter2,
    ) {}

    @Post()
    @UseGuards(JWTGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async create(
        @UserDecorator() user: JwtPayloadDto,
        @UploadedFiles() files: Express.Multer.File[],
        @Body() createPostDto: CreatePostDto,
    ) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        let post;

if (files && files.length > 0) {
    const filePaths = files.map((file) => this.filesService.saveFile(file));
    post = {
        ...createPostDto,
        files: filePaths.join(','),
        className: await this.classService.findByName(createPostDto.className)
    };
} else {
    post = {
        ...createPostDto,
        className: await this.classService.findByName(createPostDto.className)
    };
}

        var p = await this.postsService.create(post);
        p.author = await this.teacherService.findOne(user.id);
        // Set the authorId to the current user's ID
        /*this.eventEmitter.emit('persistence', {
            post: post,
            user: p.author,
            class: p.className,
            action: ActionEnum.CREATE,
        });*/
        return p;
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
    async update(
        @UploadedFiles() files: Express.Multer.File[],
        @UserDecorator() user: JwtPayloadDto,
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        const existingPost = await this.postsService.findOne(id);
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        // Process new files if any
        let fileNames = existingPost.files ? existingPost.files.split(',') : [];
        if (files && files.length > 0) {
            const newFilePaths = files.map((file) => this.filesService.saveFile(file));
            fileNames = [...fileNames, ...newFilePaths];
        }

        const postUpdate = {
            title: updatePostDto.title ?? existingPost.title,
            content: updatePostDto.content ?? existingPost.content,
            files: fileNames.join(','),
        };

        return this.postsService.update(id, postUpdate);
    }

    @Delete(':id')
    @UseGuards(JWTGuard)
    remove(@UserDecorator() user: JwtPayloadDto, @Param('id') id: string) {
        if (user.role == RoleEnum.STUDENT) throw new UnauthorizedException();
        return this.postsService.remove(id);
    }
    @Get('download/:filename')
    downloadFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = this.filesService.getFilePath(filename);
        if (!existsSync(filePath)) {
            throw new NotFoundException(`File ${filename} not found`);
        }
        const fileStream = createReadStream(filePath);
        res.set({
            'Content-Disposition': `attachment; filename="${filename}"`,
        });
        fileStream.pipe(res);
    }
    @Get('teacher/:teacherId')
    @UseGuards(JWTGuard)
    async findAllByTeacher(@Param('teacherId') teacherId: string) {
        return this.postsService.findAllByTeacher(teacherId);
    }
    /*@Post('upload')
    @UseInterceptors(FileInterceptor('files'))
    uploadFiles(@UploadedFile() file: Express.Multer.File, @Req() request, @Body() createPostDto: CreatePostDto) {
        const user = request.user;
        if (user.role !== RoleEnum.TEACHER) {
            throw new UnauthorizedException();
        }
        const filePath = this.filesService.saveFile(file);
        return this.postsService.create(createPostDto);
    }*/
}
