import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from '../rooms/entities/rooms.entity';
import { Repository } from 'typeorm';
import { Reservations } from './entities/reservations.entity';
import { ReservationDetailsDto } from './dto/reservation.details.dto';
import { ReservationConfirmDto } from './dto/reservation.confirm.dto';
import { ReservationRequestDto } from './dto/reservation.request.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Rooms) private readonly roomsRepository: Repository<Rooms>,
        @InjectRepository(Reservations)
        private readonly reservationsRepository: Repository<Reservations>,
    ) {}

    async getReservationDetails(
        reservationId: number,
        userId: number,
    ): Promise<ReservationDetailsDto> {
        if (
            await this.reservationsRepository.findOne({
                where: { id: reservationId, UserId: userId },
            })
        ) {
            const { Room, createdAt, updatedAt, ...details } = await this.reservationsRepository
                .createQueryBuilder('reservation')
                .leftJoinAndSelect('reservation.room', 'room')
                .leftJoinAndSelect('room.images', 'images')
                .addSelect((qb) => {
                    return qb.select(['images.id', 'images.url']);
                })
                .where('reservation.id = :id', { id: reservationId })
                .getOne();

            return {
                name: Room.name,
                description: Room.description,
                address: Room.address,
                university: Room.university,
                houseType: Room.houseType,
                pricePerDay: Room.pricePerDay,
                images: Room.images,
                confirmDate: createdAt.toISOString(),
                ...details,
            };
        }
        throw new HttpException('예약 내역이 존재하지 않습니다.', 404);
    }

    async createReservation(
        userId: number,
        reservationDetails: ReservationRequestDto,
        roomId: number,
    ): Promise<ReservationConfirmDto> {
        if (await this.roomsRepository.findOneBy({ id: roomId })) {
            console.log(reservationDetails);

            const reservation: Reservations = await this.reservationsRepository.save({
                ...reservationDetails,
                UserId: userId,
                RoomId: roomId,
            });
            const { createdAt, Room, RoomId, User, UserId, ...rest } = reservation;
            console.log(reservation);

            return {
                ...rest,
                confirmDate: createdAt.toISOString(),
            };
        }
        throw new HttpException('매물이 존재하지 않습니다.', 404);
    }
}
