import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(email: string, password: string, done: any) {
        // db에서 req.user의 정보와 대조하여 user validate
        const user = await this.authService.validateUser(email, password);
        // email || password가 틀리면 에러 반환
        if (!user) {
            throw new HttpException('e-mail 또는 비밀번호를 확인해주세요.', 401);
        }
        done(null, user);
    }
}
