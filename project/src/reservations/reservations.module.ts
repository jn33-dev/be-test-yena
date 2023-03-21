import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from './entities/reservations.entity';
import { Rooms } from '../rooms/entities/rooms.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Reservations, Rooms]), AuthModule],
    providers: [ReservationsService],
    controllers: [ReservationsController],
})
export class ReservationsModule {}
