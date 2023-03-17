import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('api/rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Get()
    getRooms(@Query('page') page, @Query('size') size, @Query('sort') sort) {
        return;
    }

    @Get(':roomId')
    getRoomDetail(@Param() roomId: number) {
        return;
    }
}
