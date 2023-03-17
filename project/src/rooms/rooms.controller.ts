import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomDetailsDto } from './dto/room.details.dto';
import { RoomListDto } from './dto/room.list.dto';
import { RoomsService } from './rooms.service';

@ApiTags('Rooms')
@Controller('api/rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    // 매물 목록 조회 API
    @ApiOperation({ summary: '매물 목록 조회' })
    @ApiQuery({
        name: 'page',
        required: true,
        description: '불러올 페이지',
    })
    @ApiQuery({
        name: 'size',
        required: true,
        description: '한 번에 가져오는 개수',
    })
    @ApiQuery({
        name: 'sort',
        example: '+price',
        required: false,
        description: '가격정렬 : "+price" ASC / "-price" DESC',
    })
    @ApiResponse({
        status: 200,
        description: '매물 목록 조회 성공',
        type: [RoomListDto],
    })
    @ApiResponse({
        status: 400,
        description: '매물 조회에 실패하였습니다.',
    })
    @Get()
    getRooms(@Query('page') page, @Query('size') size, @Query('sort') sort): Array<RoomListDto> {
        return;
    }

    // 매물 상세 조회 API
    @ApiOperation({ summary: '매물 상세 조회' })
    @ApiParam({
        name: 'roomId',
        required: true,
        description: 'room id',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        type: RoomDetailsDto,
    })
    @ApiResponse({
        status: 400,
        description: '매물 조회에 실패하였습니다.',
    })
    @ApiResponse({
        status: 404,
        description: '매물이 존재하지 않습니다.',
    })
    @Get(':roomId')
    getRoomDetail(@Param() roomId: number): RoomDetailsDto {
        return;
    }
}
