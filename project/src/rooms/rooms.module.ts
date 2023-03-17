import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { Images } from './entities/images.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rooms, Images])],
    providers: [RoomsService],
    controllers: [RoomsController],
})
export class RoomsModule {}
