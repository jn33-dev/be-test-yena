import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
    @ApiProperty({
        example: 'test@enkor.kr',
        required: true,
        description: '로그인시 사용할 e-mail',
    })
    public email: string;

    @ApiProperty({
        example: '한국조아',
        required: true,
        description: '닉네임',
    })
    public nickname: string;

    @ApiProperty({
        example: 'pw1234',
        required: true,
        description: '비밀번호',
    })
    public password: string;

    @ApiProperty({
        example: 'pw1234',
        required: true,
        description: '비밀번호 확인, password와 동일한 값',
    })
    public confirm: string;
}
