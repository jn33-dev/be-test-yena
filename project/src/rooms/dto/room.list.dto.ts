import { ApiProperty, OmitType } from '@nestjs/swagger';
import { RoomDetailsDto } from './room.details.dto';

export class RoomListDto extends OmitType(RoomDetailsDto, ['description'] as const) {
    @ApiProperty({
        example: 1,
        required: true,
        description: 'roomId',
    })
    public roomId: number;
}
