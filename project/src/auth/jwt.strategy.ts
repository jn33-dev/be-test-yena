import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('TOKEN_SECRET'),
        });
    }

    async validate(payload: any, done: any) {
        return payload.userId;
    }

    private static extractJWT(req: any): string | null {
        if (!req.headers.authorization_access) {
            return null;
        }
        return req.headers.authorization_access;
    }
}
