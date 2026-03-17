import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { TicketTypeResponseDto } from './dto/response-ticket-type.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketTypeService {
    constructor(private readonly prisma: PrismaService) { }

    // create
    async createTicketType(dto: CreateTicketTypeDto): Promise<TicketTypeResponseDto> {

        // check event exists
        const event = await this.prisma.event.findUnique({
            where: { id: dto.eventId }
        });

        if (!event) 
            throw new NotFoundException("Event not found");

        const ticketType = await this.prisma.ticketType.create({
            data: {
                name: dto.name,
                price: new Prisma.Decimal(dto.price),
                quantity: dto.quantity,
                eventId: dto.eventId
            }
        });

        return {
            ...ticketType,
            price: Number(ticketType.price)
        };
    }
}
