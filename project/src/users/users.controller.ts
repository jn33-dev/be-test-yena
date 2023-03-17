import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { User } from '../common/decorators/user.decorator';
import { JoinRequestDto } from './dto/join.request.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { TokenDto } from './dto/token.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Users')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: '회원가입' })
    @ApiResponse({
        status: 201,
        description: '회원 가입에 성공하였습니다.',
    })
    @ApiResponse({
        status: 412,
        description: '이미 가입된 e-mail입니다.',
    })
    @ApiResponse({
        status: 412,
        description: 'e-mail 형식이 올바르지 않습니다.',
    })
    @ApiResponse({
        status: 412,
        description: '패스워드가 일치하지 않습니다.',
    })
    @ApiResponse({
        status: 412,
        description: '패스워드 형식이 일치하지 않습니다.',
    })
    @ApiResponse({
        status: 412,
        description: '이미 사용 중인 닉네임입니다.',
    })
    @ApiResponse({
        status: 400,
        description: '요청한 데이터 형식이 올바르지 않습니다.',
    })
    @Post('signup')
    signupUser(@Body() data: JoinRequestDto) {
        this.usersService.createUser(data);
        return '회원가입';
    }

    @ApiOperation({ summary: '로그인' })
    @ApiResponse({
        status: 200,
        description: '로그인 성공',
        type: TokenDto,
    })
    @ApiResponse({
        status: 412,
        description: '닉네임 또는 패스워드를 확인해주세요.',
    })
    @ApiResponse({
        status: 400,
        description: '로그인에 실패하였습니다.',
    })
    @Post('login')
    loginUser(@User() user: LoginRequestDto): TokenDto {
        return;
    }
}
