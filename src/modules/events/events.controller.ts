import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from './dto/crete-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from '@prisma/client';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post('create')
    @Roles(UserRole.ADMIN)
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new event (admin only)', description: 'Create a new event with name, description, date and location' })
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

    // Get all events
    @Post()
    @HttpCode(200)
    @ApiOperation({
        summary: 'Get all events (admin only)',
        description: 'Get a list of all events'
    })

    @ApiResponse({
        status: 200,
        description: 'List of events retrieved successfully',
        type: [EventResponseDto]
    })

    @ApiResponse({
        status: 400,
        description: 'Bad request',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })

    async getAllEvents(): Promise<EventResponseDto[]> {
        return this.eventsService.getAllEvents();
    }

    // Get event by ID
    @Post(':id')
    @HttpCode(200)
    @ApiOperation({
        summary: 'Get event by ID',
        description: 'Get details of an event by ID'
    })

    @ApiResponse({
        status: 200,
        description: 'Event retrieved successfully',
        type: EventResponseDto
    })

    @ApiResponse({
        status: 400,
        description: 'Bad request',
    })

    @ApiResponse({
        status: 404,
        description: 'Event not found',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })

    async getEventById(@Param('id') id: string): Promise<EventResponseDto> {
        return this.eventsService.getEventById(id); 
    }
    


}
