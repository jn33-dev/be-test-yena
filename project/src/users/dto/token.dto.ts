import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class TokenDto {
    @IsString()
    @IsEmpty()
    @ApiProperty({
        example: 'Bearer eyJhbGciO.......',
        required: true,
        description: 'access token',
    })
    public accessToken: string;

    @IsString()
    @IsEmpty()
    @ApiProperty({
        example: 'Bearer eyJhbGciO.......',
        required: true,
        description: 'refresh token',
    })
    public refreshToken: string;
}
