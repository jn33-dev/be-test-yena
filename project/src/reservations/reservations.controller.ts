import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessToken } from '../common/decorators/access-token.decorator';
import { TokenDto } from '../users/dto/token.dto';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { ReservationConfirmDto } from './dto/reservation.confirm.dto';
import { ReservationDetailsDto } from './dto/reservation.details.dto';
import { ReservationRequestDto } from './dto/reservation.request.dto';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Reservations')
@Controller('api/reservations')
export class ReservationsController {
    constructor(private reservationService: ReservationsService) {}

    // ############# 예약 내역 확인 SWAGGER #############
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
        status: 500,
        description: '서버 오류가 발생했습니다.',
    })
    // ############# 예약 내역 확인 API #############
    @UseGuards(JwtAuthGuard)
    @Get(':reservationId')
    async getReservationDetails(
        @AccessToken() userId: number,
        @Param() reservationId: number,
    ): Promise<ReservationDetailsDto> {
        return await this.reservationService.getReservationDetails(reservationId, userId);
    }

    // ############# 숙박 예약 SWAGGER #############
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
        description: '요청한 데이터 형식을 확인해주세요.',
    })
    @ApiResponse({
        status: 500,
        description: '서버 오류가 발생했습니다.',
    })
    // ############# 숙박 예약 API #############
    @UseGuards(JwtAuthGuard)
    @Post(':roomId')
    async createReservation(
        @AccessToken() userId: number,
        @Body() data: ReservationRequestDto,
        @Param() roomId: number,
    ): Promise<ReservationConfirmDto> {
        console.log('controller userId?', userId);

        return await this.reservationService.createReservation(userId, data, roomId);
    }
}
