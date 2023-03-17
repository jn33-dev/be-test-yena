import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReservationRequestDto } from './dto/reservation.request.dto';
import { ReservationsService } from './reservations.service';

@Controller('api/reservations')
export class ReservationsController {
    constructor(private reservationService: ReservationsService) {}

    @Get()
    getReservationDetails() {
        return;
    }

    @Post(':roomId')
    createReservation(@Body() data: ReservationRequestDto) {
        return;
    }
}
