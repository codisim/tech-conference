import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SessionSpeakerService } from './session-speaker.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from '@prisma/client';
import { CreateSessionSpeakerDto } from './dto/create-session.dto';
import { SessionSpeakerResponseDto } from './dto/response-session.dto';

@ApiTags('session-speaker')
@Controller('session-speaker')
export class SessionSpeakerController {
    constructor(private readonly sessionSpeakerService: SessionSpeakerService) { }

    // added a new Session Speaker (admin only)
    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Add a new session speaker (admin only)',
    })

    @ApiResponse({
        status: 201,
        description: 'Session speaker added successfully',
    })

    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Invalid or expired access token',
    })

    @ApiResponse({
        status: 403,
        description: 'Forbidden. User does not have permission to perform this action',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })

    async addSessionSpeaker(@Body() createSessionSpeakerDto: CreateSessionSpeakerDto): Promise<any> {
        await this.sessionSpeakerService.addSessionSpeaker(createSessionSpeakerDto);
    }


    // get all session speaker (admin)
    @Get()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get all session speakers (admin only)',
    })

    @ApiResponse({
        status: 200,
        description: 'List of session speakers retrieved successfully',
    })

    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Invalid or expired access token',
    })

    @ApiResponse({
        status: 403,
        description: 'Forbidden. User does not have permission to perform this action',
    })

    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })

    async getAllSessionSpeakers(): Promise<SessionSpeakerResponseDto[]> {
        return this.sessionSpeakerService.getAllSessionSpeakers();
    }


}
