import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '../common/interceptors/undefinedToNull.interceptor';
import { RoomDetailsDto } from './dto/room.details.dto';
import { RoomListDto } from './dto/room.list.dto';
import { RoomsService } from './rooms.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Rooms')
@Controller('api/rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

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
        status: 500,
        description: '서버 오류가 발생했습니다.',
    })
    @Get()
    async getRooms(
        @Query('page', ParseIntPipe) page,
        @Query('size', ParseIntPipe) size,
        @Query('sort') sort,
    ): Promise<Array<RoomListDto>> {
        if (sort.includes('+')) {
            sort = 'ASC';
        } else {
            sort = 'DESC';
        }
        return await this.roomsService.getRoomList(page, size, sort);
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
        status: 404,
        description: '매물이 존재하지 않습니다.',
    })
    @ApiResponse({
        status: 500,
        description: '서버 오류가 발생했습니다.',
    })
    @Get(':roomId')
    async getRoomDetail(@Param() roomId: number): Promise<RoomDetailsDto> {
        return await this.roomsService.getRoomDetails(roomId);
    }
}
