import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from '@prisma/client';
import { CreateSessionDto } from './dto/create-sesion.dto';
import { SessionResponseDto } from './dto/session-response.dto';


@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) { }

    // create new session
    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Create a new session',
        description: 'Only admins can create a new session'
    })

    @ApiResponse({
        status: 201,
        description: 'Session created successfully',
    })

    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })

    @ApiResponse({
        status: 403,
        description: 'Forbidden'
    })

    @ApiResponse({
        status: 500,
        description: 'Internal Server Error'
    })

    @ApiBody({ type: CreateSessionDto })
    async createSession(@Body() createSessionDto: CreateSessionDto): Promise<SessionResponseDto> {
        return this.sessionsService.createSession(createSessionDto);
    }
}

