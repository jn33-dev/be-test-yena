import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtRefreshStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            passReqToCallback: true,
            secretOrKey: configService.get<string>('TOKEN_SECRET'),
        });
    }

    async validate(req: Request, payload: any, done: any) {
        console.log('validate?');

        const refreshToken = req.headers.get('authorization_refresh');
        const refreshTokenWithoutBearer = refreshToken.replace('Bearer ', '');
        const user: Users = await this.authService.findUserByRefreshToken(
            refreshTokenWithoutBearer,
        );
        user.refreshToken = refreshToken;
        done(null, user);
    }

    private static extractJWT(req: any): string | null {
        console.log('extract?');

        if (!req.headers.authorization_refresh) {
            return null;
        }

        console.log(req.headers.authorization_refresh);

        return req.headers.authorization_refresh;
    }
}
