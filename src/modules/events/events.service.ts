import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/crete-event.dto';
import { EventResponseDto } from './dto/event-response.dto';

@Injectable()
export class EventsService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createEvent(createEventDto: CreateEventDto): Promise<EventResponseDto> {
        const { title, description, startDate, endDate, location, organizerId } = createEventDto;

        const existOrganizer = await this.prisma.organizer.findUnique({
            where: { id: organizerId }
        })

        if (!existOrganizer) {
            throw new InternalServerErrorException('Organizer not found');
        }

        try {
            const event = await this.prisma.event.create({
                data: {
                    title,
                    description,
                    startDate,
                    endDate,
                    location,
                    organizerId,
                    venueId: createEventDto.venueId || null
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    startDate: true,
                    endDate: true,
                    location: true,
                    createdAt: true,
                    organizerId: true,
                    organizer: {
                        select: {
                            id: true,
                            name: true,
                            companyName: true,
                            contactInfo: true,
                        }
                    },
                    venue: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                        }
                    }
                }
            })

            return event;

        } catch (error) {
            console.error('Error creating event:', error);
            throw new InternalServerErrorException('Failed to create event');
        }
    }

    // get all events
    async getAllEvents(): Promise<EventResponseDto[]> {
        try {
            const events = await this.prisma.event.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    startDate: true,
                    endDate: true,
                    location: true,
                    createdAt: true,
                    organizerId: true,
                    organizer: {
                        select: {
                            id: true,
                            name: true,
                            companyName: true,
                            contactInfo: true,
                        }
                    },
                    venue: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                        }
                    }
                }
            });
            return events;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw new InternalServerErrorException('Failed to fetch events');
        }
    }
}
