import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { TokenDto } from '../users/dto/token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(email: string, password: string) {
        // db에 저장된 유저 정보 불러오기
        const user: Users = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'password'],
        });
        console.log(password, user);

        // user가 없으면 local-strategy에서 throw error
        if (!user) {
            return null;
        }
        // 입력받은 암호를 해싱해서 db password 비교 -> 맞으면 user.id 반환, 아니면 null을 반환하여 local-strategy에서 throw error
        const result: boolean = await bcrypt.compare(password, user.password);
        if (result) {
            return user;
        }
        return null;
    }

    async createAccessToken(userId: number): Promise<String> {
        const accessToken = `Bearer ${this.jwtService.sign(
            { userId },
            {
                expiresIn: await this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
            },
        )}`;

        return accessToken;
    }

    async createRefreshToken(userId: number): Promise<String> {
        const refreshToken = `Bearer ${this.jwtService.sign(
            {},
            {
                expiresIn: await this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
            },
        )}`;

        await this.usersRepository.save({
            id: userId,
            refreshToken: await bcrypt.hash(refreshToken, 12),
        });

        return refreshToken;
    }

    async findUserByRefreshToken(refreshToken: string) {
        console.log('auth service findUserByRefreshToken');
        const refreshTokenHashValue = await bcrypt.hash(refreshToken, 12);
        const user = await this.usersRepository.findOne({
            where: { refreshToken: refreshTokenHashValue },
            select: ['id', 'nickname'],
        });
        console.log(user);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
