import { JoinRequestDto } from './join.request.dto';
import { OmitType } from '@nestjs/swagger';

export class LoginRequestDto extends OmitType(JoinRequestDto, ['nickname', 'confirm'] as const) {}
