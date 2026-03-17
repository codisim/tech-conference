import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from '@prisma/client';
import { CreateSessionDto } from './dto/create-sesion.dto';
import { SessionResponseDto } from './dto/session-response.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  // create new session
  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new session',
    description: 'Only admins can create a new session',
  })
  @ApiResponse({
    status: 201,
    description: 'Session created successfully',
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
    description: 'Internal Server Error',
  })
  @ApiBody({ type: CreateSessionDto })
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionResponseDto> {
    return this.sessionsService.createSession(createSessionDto);
  }

  // get all sessions (only admin)
  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all sessions',
    description: 'Only admins can get all sessions',
  })
  @ApiResponse({
    status: 200,
    description: 'Sessions retrieved successfully',
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
    description: 'Internal Server Error',
  })
  async getAllSessions(): Promise<SessionResponseDto[]> {
    return this.sessionsService.getAllSessions();
  }

  // get all sessions for an event
  @Get('event/:eventId')
  @ApiOperation({
    summary: 'Get all sessions for an event',
  })
  @ApiResponse({
    status: 200,
    description: 'Sessions retrieved successfully',
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
    description: 'Internal Server Error',
  })
  async getSessionsByEventId(
    @Param('eventId') eventId: string,
  ): Promise<SessionResponseDto[]> {
    return this.sessionsService.getSessionsByEventId(eventId);
  }

  // update session (only admin)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a session',
    description: 'Only admins can update a session',
  })
  @ApiResponse({
    status: 200,
    description: 'Session updated successfully',
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
    description: 'Internal Server Error',
  })
  async updateSession(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<SessionResponseDto> {
    return this.sessionsService.updateSession(id, updateSessionDto);
  }

  // delete session (only admin)
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a session',
    description: 'Only admins can delete a session',
  })
  @ApiResponse({
    status: 200,
    description: 'Session deleted successfully',
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
    description: 'Internal Server Error',
  })
  async deleteSession(@Param('id') id: string): Promise<{ message: string }> {
    return this.sessionsService.deleteSession(id);
  }

  // delete all sessions for an event (only admin)
  @Delete('delete/event/:eventId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete all sessions for an event',
    description: 'Only admins can delete all sessions for an event',
  })
  @ApiResponse({
    status: 200,
    description: 'Sessions deleted successfully',
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
    description: 'Internal Server Error',
  })
  async deleteSessionsByEventId(
    @Param('eventId') eventId: string,
  ): Promise<{ message: string }> {
    return this.sessionsService.deleteSessionsByEventId(eventId);
  }
}
