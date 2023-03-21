import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from './entities/images.entity';
import { Rooms } from './entities/rooms.entity';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Rooms) private readonly roomsRepository: Repository<Rooms>,
        @InjectRepository(Images) private readonly imagesRepository: Repository<Images>,
    ) {}

    getRoomList(page: number, size: number, sort: 'ASC' | 'DESC'): Promise<Array<Rooms>> {
        return this.roomsRepository
            .createQueryBuilder('rooms')
            .leftJoinAndSelect('rooms.images', 'images')
            .select([
                'rooms.id',
                'rooms.name',
                'rooms.address',
                'rooms.university',
                'rooms.houseType',
                'rooms.pricePerDay',
                'images.url',
                'images.key',
            ])
            .orderBy('rooms.pricePerDay', sort)
            .distinct(true)
            .take(size)
            .skip((page - 1) * size)
            .getMany();
    }

    async getRoomDetails(id: number): Promise<Rooms> {
        if (!(await this.roomsRepository.findOneBy({ id }))) {
            throw new HttpException('매물이 존재하지 않습니다.', 404);
        }
        return this.roomsRepository
            .createQueryBuilder('rooms')
            .leftJoinAndSelect('rooms.images', 'images')
            .select([
                'rooms.name',
                'rooms.address',
                'rooms.description',
                'rooms.university',
                'rooms.houseType',
                'rooms.pricePerDay',
                'images.url',
                'images.key',
            ])
            .getOne();
    }
}
