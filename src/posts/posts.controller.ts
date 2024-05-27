import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    UnauthorizedException,
    Res,
    UseInterceptors,
    NotFoundException,
    UploadedFiles,
} from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { RoleEnum } from 'src/common/enum/roles.enum';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/common/service/file-upload.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { ClassService } from 'src/class/class.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly teacherService: TeacherService,
        private readonly classService: ClassService,
        private readonly filesService: FileUploadService,
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
                className: await this.classService.findByName(createPostDto.className),
            };
        } else {
            post = {
                ...createPostDto,
                className: await this.classService.findByName(createPostDto.className),
            };
        }

        var p = await this.postsService.create(post);
        p.author = await this.teacherService.findOne(user.id);
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
}
