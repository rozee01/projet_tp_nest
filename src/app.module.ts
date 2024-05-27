import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommonModule } from './common/common.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AnnouncementModule } from './announcement/announcement.module';

import { entitiesList } from './common/entities/entities';
import { EmailServerModule } from './email-server/email-server.module';
import { TestiController } from './testi/testi.controller';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
                return {
                    type: 'postgres',
                    host: config.get<string>('DB_HOST'),
                    port: config.get<number>('DB_PORT'),
                    username: config.get<string>('DB_USERNAME'),
                    password: config.get<string>('DB_PASSWORD'),
                    database: config.get<string>('DB_NAME'),
                    entities: entitiesList,
                    synchronize: true, // never use True in production
                };
            },
        }),
        AuthModule,
        UsersModule,
        PostsModule,
        ClassModule,
        CommonModule,
        StudentModule,
        TeacherModule,
        AnnouncementModule,
        EmailServerModule,
    ],
    controllers: [TestiController],
})
export class AppModule {}
