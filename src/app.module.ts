import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { File } from './files/entities/file.entity';
import { FilesModule } from './files/files.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { Announcement } from './announcement/entities/announcement.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

// import { ClassModule } from './class/class.module';
// import { Class } from './class/entities/class.entity';
// import { UserModule } from './user/user.module';
// import { User } from './user/entities/user.entity';
// import { StudentClassModule } from './student-class/student-class.module';
// import { StudentClass } from './student-class/entities/studentclass.entity';

// @Module({
//   imports: [
//     CommonModule,
//     PostsModule,
//     ClassModule,
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: '0000',
//       database: 'ClassroomDb', 
//       entities: [Post, File, Announcement, Class, User, StudentClass],
//       synchronize: true,
//     }),
//     FilesModule,
//     AnnouncementModule,
//     ClassModule,
//     UserModule,
//     StudentClassModule,
//   ],
// })
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        CommonModule,
        PostsModule,
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
                    entities: [Post, File, Announcement, User],
                    synchronize: true, // never use True in production
                };
            },
        }),
        AnnouncementModule,
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
