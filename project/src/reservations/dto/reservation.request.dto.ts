import { ApiProperty } from '@nestjs/swagger';

export class ReservationRequestDto {
    @ApiProperty({
        example: '2023-04-06',
        required: true,
        description: '숙박을 시작하는 날짜',
    })
    public startDate: string;

    @ApiProperty({
        example: '2023-04-06',
        required: true,
        description: '숙박을 종료하는 날짜',
    })
    public endDate: string;

    @ApiProperty({
        example: 1,
        required: true,
        description: '투숙객 성인 인원',
    })
    public adults: number;

    @ApiProperty({
        example: 0,
        required: true,
        description: '투숙객 아동 인원',
    })
    public children: number;

    @ApiProperty({
        example: '010-1234-1234',
        required: true,
        description: '예약자의 휴대폰번호 11자리',
    })
    public contact: string;
}
