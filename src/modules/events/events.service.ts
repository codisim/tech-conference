import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/crete-event.dto';

@Injectable()
export class EventsService {
    constructor(
        private prisma: PrismaService
    ){}

    async createEvent(createEventDto: CreateEventDto): Promise<EventResponseDto> {
        const { name, description, date, location } = createEventDto;

        try {
            const event = await this.prisma.event.create({
            data: {
                description,
                date,
                location
            }
        })
        } catch (error) {
            console.error('Error creating event:', error);
            throw new InternalServerErrorException('Failed to create event');
        }

        return event;
    }   
}
