import { ApiProperty } from '@nestjs/swagger';

export class RoomDetailsDto {
    @ApiProperty({
        example: '산포리 펜션',
        required: true,
        description: '매물 이름',
    })
    public name: string;

    @ApiProperty({
        example:
            '입실/퇴실 시간\n ㅁ 입실시간 : 오후 3시 ~ 오후 10시\n ㅁ 퇴실시간 : 익일 오전 11시 까지\n ㅁ 오후 10시 이후의 입실은 미리 연락부탁드립니다.',
        required: true,
        description: '매물 상세 정보',
    })
    public description: string;

    @ApiProperty({
        example: '경상북도 울진군 근남면 세포2길 1-21',
        required: true,
        description: '매물 주소',
    })
    public address: string;

    @ApiProperty({
        example: '울진대학교',
        required: true,
        description: '매물 인근 대학',
    })
    public university: string;

    @ApiProperty({
        example: '펜션',
        required: true,
        description: '매물 종류',
    })
    public houseType: string;

    @ApiProperty({
        example: 30000,
        required: true,
        description: '매물의 1일 숙박 가격',
    })
    public pricePerDay: number;

    @ApiProperty({
        example: [
            {
                url: 'http://si.wsj.net/public/resources/images/OB-YO176_hodcol_H_20130815124744.jpg',
                key: 1,
            },
            {
                url: 'https://image.pensionlife.co.kr/penimg/pen_1/pen_19/1977/9734f7418fcc01a2321ba800b1f2c7ee.jpg',
                key: 2,
            },
        ],
        required: true,
        description: '매물 사진',
    })
    public images: { url: string; key: number }[];
}
