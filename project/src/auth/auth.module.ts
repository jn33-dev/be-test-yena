import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Users } from '../users/entities/users.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Module({
    imports: [
        PassportModule.register({ session: false }),
        TypeOrmModule.forFeature([Users]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('TOKEN_SECRET'),
            }),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
    exports: [AuthService],
})
export class AuthModule {}
