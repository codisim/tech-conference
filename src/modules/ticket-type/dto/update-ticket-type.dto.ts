import { PartialType } from '@nestjs/swagger';
import { TicketTypeResponseDto } from './response-ticket-type.dto';

export class UpdateTicketTypeResponseDto extends PartialType(
  TicketTypeResponseDto,
) {}
