import { ApiProperty } from '@nestjs/swagger';
import { ReservationRequestDto } from './reservation.request.dto';

export class ReservationConfirmDto extends ReservationRequestDto {
    @ApiProperty({
        example: '2023-04-06T14:28:00.000Z',
        required: true,
        description: '예약한 날짜와 시간',
    })
    public confirmDate: string;
}
