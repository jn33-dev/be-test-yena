import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JoinRequestDto } from './dto/join.request.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

    async findUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });
        return user;
    }

    async findUserByNickname(nickname: string) {
        const user = await this.usersRepository.findOne({
            where: { nickname },
        });
        return user;
    }

    async createUser(data: JoinRequestDto) {
        // e-mail 중복 체크
        const checkEmail = await this.usersRepository.findOne({ where: { email: data.email } });
        if (checkEmail) {
            throw new HttpException('이미 가입된 e-mail입니다.', 409);
        }

        // 닉네임 중복 체크
        const checkNickname = await this.usersRepository.findOne({
            where: { nickname: data.nickname },
        });
        if (checkNickname) {
            throw new HttpException('이미 사용 중인 닉네임입니다.', 409);
        }

        // 비밀번호 확인
        if (data.password !== data.confirm) {
            throw new HttpException('패스워드가 일치하지 않습니다.', 409);
        }

        const hash = await bcrypt.hash(data.password, 12);
        await this.usersRepository.save({
            email: data.email,
            nickname: data.nickname,
            password: hash,
        });
    }
}
