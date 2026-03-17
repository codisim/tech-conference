import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';

@Injectable()
export class TicketService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    // create new ticket
    async createTicket(createTicketDto: CreateTicketDto, userId: string): Promise<TicketResponseDto> {
        const { eventId, ticketTypeId, orderId, qrCode, status } = createTicketDto;


        const ticketType = await this.prisma.ticketType.findUnique({
            where: { id: ticketTypeId }
        });

        if (!ticketType)
            throw new NotFoundException("Ticket type not found");


        if (ticketType.soldQuantity >= ticketType.quantity)
            throw new BadRequestException("Tickets are sold out");


        const result = await this.prisma.$transaction(async (tx) => {

            const ticket = await tx.ticket.create({
                data: {
                    userId,
                    eventId,
                    ticketTypeId,
                    orderId,
                    qrCode,
                    status: status ?? "ACTIVE"
                },
                include: {
                    ticketType: true
                }
            });

            await tx.ticketType.update({
                where: { id: ticketTypeId },

                data: {
                    soldQuantity: {
                        increment: 1
                    }
                }
            })

            return ticket;

        });

        return result;

    }


}
