import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authentication } from '../common/decorators/authentication.decorator';
import { TokenDto } from '../users/dto/token.dto';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { ReservationConfirmDto } from './dto/reservation.confirm.dto';
import { ReservationDetailsDto } from './dto/reservation.details.dto';
import { ReservationRequestDto } from './dto/reservation.request.dto';
import { ReservationsService } from './reservations.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Reservations')
@Controller('api/reservations')
export class ReservationsController {
    constructor(private reservationService: ReservationsService) {}

    @ApiOperation({ summary: '예약 내역 확인' })
    @ApiParam({
        name: 'reservationId',
        required: true,
        description: '예약 내역 id',
    })
    @ApiResponse({
        status: 200,
        description: '예약 내역 조회 성공',
        type: ReservationDetailsDto,
    })
    @ApiResponse({
        status: 401,
        description: '로그인 후 사용 가능합니다.',
    })
    @ApiResponse({
        status: 404,
        description: '예약 내역이 존재하지 않습니다.',
    })
    @ApiResponse({
        status: 400,
        description: '예약 내역 조회에 실패하였습니다.',
    })
    @Get(':reservationId')
    getReservationDetails(@Authentication() token: TokenDto): ReservationDetailsDto {
        return;
    }

    @ApiOperation({ summary: '숙박 예약' })
    @ApiParam({
        name: 'roomId',
        required: true,
        description: '예약하려는 room id',
    })
    @ApiResponse({
        status: 201,
        description: '숙박 예약 성공',
        type: ReservationConfirmDto,
    })
    @ApiResponse({
        status: 401,
        description: '로그인 후 사용 가능합니다.',
    })
    @ApiResponse({
        status: 404,
        description: '매물이 존재하지 않습니다.',
    })
    @ApiResponse({
        status: 412,
        description: '예약 일자 / 숙박인원 / 연락처를 확인해주세요.',
    })
    @ApiResponse({
        status: 400,
        description: '숙박 예약에 실패하였습니다.',
    })
    @Post(':roomId')
    createReservation(
        @Body() data: ReservationRequestDto,
        @Authentication() token: TokenDto,
    ): ReservationConfirmDto {
        return;
    }
}
