import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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

    

}
