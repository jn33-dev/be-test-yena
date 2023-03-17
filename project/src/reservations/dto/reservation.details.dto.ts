import { IntersectionType } from '@nestjs/swagger';
import { RoomDetailDto } from 'src/rooms/dto/room.details.dto';
import { ReservationConfirmDto } from './reservation.confirm.dto';

export class ReservationDetailsDto extends IntersectionType(RoomDetailDto, ReservationConfirmDto) {}
