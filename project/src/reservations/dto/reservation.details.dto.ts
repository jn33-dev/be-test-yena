import { IntersectionType } from '@nestjs/swagger';
import { RoomDetailsDto } from '../../rooms/dto/room.details.dto';
import { ReservationConfirmDto } from './reservation.confirm.dto';

export class ReservationDetailsDto extends IntersectionType(
    RoomDetailsDto,
    ReservationConfirmDto,
) {}
