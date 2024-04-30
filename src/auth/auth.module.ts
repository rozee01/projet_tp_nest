import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService): Promise<JwtModuleOptions> => {
                return {
                    secret: config.get<string>('SECRET_KEY'),
                    signOptions: {
                        expiresIn: '7d',
                    },
                };
            },
        }),
    ],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
