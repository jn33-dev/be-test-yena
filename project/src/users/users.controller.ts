import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { User } from '../common/decorators/user.decorator';
import { JoinRequestDto } from './dto/join.request.dto';
import { TokenDto } from './dto/token.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Users } from './entities/users.entity';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Users')
@Controller('api/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @ApiOperation({ summary: '회원가입' })
    @ApiResponse({
        status: 201,
        description: '회원 가입에 성공하였습니다.',
    })
    @ApiResponse({
        status: 409,
        description: '이미 가입된 e-mail입니다.',
    })
    @ApiResponse({
        status: 409,
        description: '이미 사용 중인 닉네임입니다.',
    })
    @ApiResponse({
        status: 409,
        description: '패스워드가 일치하지 않습니다.',
    })
    @ApiResponse({
        status: 400,
        description: '요청한 데이터 형식을 확인해주세요.',
    })
    // ########## 회원 가입 API ###########
    @Post('signup')
    async signupUser(@Body() data: JoinRequestDto) {
        await this.usersService.createUser(data);
        return { message: '회원가입에 성공하였습니다.' };
    }

    @ApiOperation({ summary: '로그인' })
    @ApiResponse({
        status: 200,
        description: '로그인 성공',
        type: TokenDto,
    })
    @ApiResponse({
        status: 401,
        description: '닉네임 또는 패스워드를 확인해주세요.',
    })
    @ApiResponse({
        status: 400,
        description: '요청한 데이터 형식을 확인해주세요.',
    })
    //  ########## 로그인 API ###########
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginUser(@User() user: Users) {
        const authentication = await this.authService.createToken(user.id);

        return { authentication };
    }
}
