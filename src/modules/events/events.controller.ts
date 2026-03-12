import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from './dto/crete-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { UpdatedEventDto } from './dto/update-event-dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post('create')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
     @ApiBearerAuth('JWT-auth')
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
    @Get()
    @HttpCode(200)
    @ApiOperation({
        summary: 'Get all events',
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
    @Get(':id')
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

    // update event by ID (admin only)
    @Patch(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
     @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Update event by ID (admin only)',
        description: 'Update details of an event by ID (admin only)'
    })

    @ApiResponse({
        status: 200,
        description: 'Event updated successfully',
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
        status: 401,
        description: 'Unauthorized',
    })

    @ApiResponse({
        status: 403,
        description: 'Forbidden',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })

    async updateEventById(@Param('id') id: string, updateEventDto: UpdatedEventDto): Promise<EventResponseDto> {
        return await this.eventsService.updateEventById(id, updateEventDto);
    }
}
