import { Controller, HttpCode, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService){}

    @Post('create')
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new event', description: 'Create a new event with name, description, date and location' })
    @ApiResponse({
        status: 201,
        description: 'Event created successfully',
        type: EventResponseDto
    })

    @ApiResponse({
        status: 400,
        description: 'Bad request',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })

    async createEvent(@Body() createEventDto: CreateEventDto): Promise<EventResponseDto> {
        return this.eventsService.createEvent(createEventDto);
    }

}
