import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';
import { UpdateTicketDto } from './dto/update-ticker.dto';

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

    // get all
    async getAllTickets(userId: string): Promise<TicketResponseDto[]> {
        return this.prisma.ticket.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    }

    // get single 
    async getTicketById(id: string, userId: string): Promise<TicketResponseDto> {

        const ticket = await this.prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticket)
            throw new NotFoundException("Ticket not found");

        if (ticket.userId !== userId)
            throw new ForbiddenException("You are not allowed to access this ticket");

        return ticket;
    }

    // update
    async updateTicket(
        id: string,
        dto: UpdateTicketDto,
        userId: string
    ): Promise<TicketResponseDto> {

        const ticket = await this.prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticket)
            throw new NotFoundException("Ticket not found");

        if (ticket.userId !== userId)
            throw new ForbiddenException("You cannot update this ticket");

        return this.prisma.ticket.update({
            where: { id },
            data: {
                qrCode: dto.qrCode,
                status: dto.status
            }
        });
    }

}
