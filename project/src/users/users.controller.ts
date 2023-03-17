import { Body, Controller, Post } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('signup')
    signup(@Body() data: JoinRequestDto) {
        this.usersService.createUser(data);
        return '회원가입';
    }

    @Post('login')
    login() {}
}
