import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from './entities/reservations.entity';
import { Rooms } from '../rooms/entities/rooms.entity';
import { Images } from '../rooms/entities/images.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservations, Rooms, Images])],
    providers: [ReservationsService],
    controllers: [ReservationsController],
})
export class ReservationsModule {}
