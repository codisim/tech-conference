import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionSpeakerService } from './session-speaker.service';
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
import { CreateSessionSpeakerDto } from './dto/create-session.dto';
import { SessionSpeakerResponseDto } from './dto/response-session.dto';
import { UpdateSessionSpeakerDto } from './dto/update-session.dto';

@ApiTags('session-speaker')
@Controller('session-speaker')
export class SessionSpeakerController {
  constructor(private readonly sessionSpeakerService: SessionSpeakerService) {}

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
    description:
      'Forbidden. User does not have permission to perform this action',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async addSessionSpeaker(
    @Body() createSessionSpeakerDto: CreateSessionSpeakerDto,
  ): Promise<any> {
    await this.sessionSpeakerService.addSessionSpeaker(createSessionSpeakerDto);
  }

  // get all session speaker (admin)
  @Get()
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserRole.ADMIN)
  // @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all session speakers',
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
    description:
      'Forbidden. User does not have permission to perform this action',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getAllSessionSpeakers(): Promise<SessionSpeakerResponseDto[]> {
    return this.sessionSpeakerService.getAllSessionSpeakers();
  }

  // get single session-speaker
  @Get(':id')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserRole.ADMIN)
  // @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get single session speaker',
  })
  @ApiResponse({
    status: 200,
    description: 'Session speaker retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or expired access token',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. User does not have permission to perform this action',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getSingleSessionSpeaker(
    @Param('id') id: string,
  ): Promise<SessionSpeakerResponseDto> {
    return this.sessionSpeakerService.getSingleSessionSpeaker(id);
  }

  // update a session speaker
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateSessionSpeakerDto,
  })
  @ApiOperation({
    summary: 'Update a session speaker (admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Session speaker updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or expired access token',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. User does not have permission to perform this action',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async updateSessionSpeaker(
    @Param('id') id: string,
    @Body() updateSessionSpeakerDto: UpdateSessionSpeakerDto,
  ): Promise<SessionSpeakerResponseDto> {
    return this.sessionSpeakerService.updateSessionSpeaker(
      id,
      updateSessionSpeakerDto,
    );
  }

  // delete session speaker
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete a session speaker (admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Session speaker deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or expired access token',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. User does not have permission to perform this action',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async deleteSessionSpeaker(@Param('id') id: string): Promise<any> {
    await this.sessionSpeakerService.deleteSessionSpeaker(id);
  }
}
