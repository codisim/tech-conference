import { Module } from '@nestjs/common';
import { TicketTypeService } from './ticket-type.service';
import { TicketTypeController } from './ticket-type.controller';

@Module({
  providers: [TicketTypeService],
  controllers: [TicketTypeController],
})
export class TicketTypeModule {}
