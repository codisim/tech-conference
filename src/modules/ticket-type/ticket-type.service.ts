import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { TicketTypeResponseDto } from './dto/response-ticket-type.dto';
import { Prisma } from '@prisma/client';
import { UpdateTicketTypeResponseDto } from './dto/update-ticket-type.dto';

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

    // get all
    async getAll(): Promise<TicketTypeResponseDto[]> {
        const data = await this.prisma.ticketType.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return data.map(t => ({
            ...t,
            price: Number(t.price)
        }));
    }

    // get event by in
    async getByEvent(eventId: string): Promise<TicketTypeResponseDto[]> {

        const data = await this.prisma.ticketType.findMany({
            where: { eventId }
        });

        return data.map(t => ({
            ...t,
            price: Number(t.price)
        }));
    }

    // get single
    async getOne(id: string): Promise<TicketTypeResponseDto> {

        const ticketType = await this.prisma.ticketType.findUnique({
            where: { id }
        });

        if (!ticketType) {
            throw new NotFoundException("Ticket type not found");
        }

        return {
            ...ticketType,
            price: Number(ticketType.price)
        };
    }

    // update
    async update(
        id: string,
        dto: UpdateTicketTypeResponseDto
    ): Promise<TicketTypeResponseDto> {

        const existing = await this.prisma.ticketType.findUnique({
            where: { id }
        });

        if (!existing)
            throw new NotFoundException("Ticket type not found");

        if (dto.quantity && dto.quantity < existing.soldQuantity) {
            throw new BadRequestException("Quantity cannot be less than sold tickets");
        }

        const updated = await this.prisma.ticketType.update({
            where: { id },
            data: {
                name: dto.name,
                price: dto.price ? new Prisma.Decimal(dto.price) : undefined,
                quantity: dto.quantity
            }
        });

        return {
            ...updated,
            price: Number(updated.price)
        };
    }

    // delete
    async delete(id: string): Promise<void> {

        const existing = await this.prisma.ticketType.findUnique({
            where: { id }
        });

        if (!existing) {
            throw new NotFoundException("Ticket type not found");
        }

        await this.prisma.ticketType.delete({
            where: { id }
        });
    }
}
