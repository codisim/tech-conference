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
import { VenuesService } from './venues.service';
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
import { CreateVenueDto } from './dto/create-vanue.dto';
import { VenueResponseDto } from './dto/vanue-response.dto';
import { UpdateVenueDto } from './dto/update-vanue.dto';
import { EventResponseDto } from '../events/dto/event-response.dto';

@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  // create a venue
  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a new venue',
    description: 'Only admins can create a new venue',
  })
  @ApiResponse({
    status: 201,
    description: 'Venue created successfully',
    type: VenueResponseDto,
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
  @ApiBody({ type: CreateVenueDto })
  async createVenue(
    @Body() createVenueDto: CreateVenueDto,
  ): Promise<VenueResponseDto> {
    return this.venuesService.createVenue(createVenueDto);
  }

  // get all venues
  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all venues',
    description: 'Only admins can view all venues',
  })
  @ApiResponse({
    status: 200,
    description: 'Venues retrieved successfully',
    type: [VenueResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async getAllVenues(): Promise<VenueResponseDto[]> {
    return this.venuesService.getAllVenues();
  }

  // get a venue by id
  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get a venue by ID',
    description: 'Only admins can view a venue by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Venue retrieved successfully',
    type: VenueResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async getVenueById(@Param('id') id: string): Promise<any> {
    return this.venuesService.getVenueById(id);
  }

  // update a venue by id
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update a venue by ID',
    description: 'Only admins can update a venue by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Venue updated successfully',
    type: VenueResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async updateVenueById(
    @Param('id') id: string,
    @Body() updateVenueDto: UpdateVenueDto,
  ): Promise<VenueResponseDto> {
    return this.venuesService.updateVenue(id, updateVenueDto);
  }

  // delete a venue by id
  @Delete(':id/delete')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete a venue by ID',
    description: 'Only admins can delete a venue by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Venue deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async deleteVenueById(@Param('id') id: string): Promise<{ message: string }> {
    return this.venuesService.deleteVenue(id);
  }
}
