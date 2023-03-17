import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
    @ApiProperty({
        example: 'Bearer eyJhbGciO.......',
        required: true,
        description: 'access token',
    })
    public accessToken: string;

    @ApiProperty({
        example: 'Bearer eyJhbGciO.......',
        required: true,
        description: 'refresh token',
    })
    public refreshToken: string;
}
