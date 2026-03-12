import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from '@prisma/client';
import { CreateVenueDto } from './dto/create-vanue.dto';
import { VenueResponseDto } from './dto/vanue-response.dto';


@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
    constructor(private readonly venuesService: VenuesService) { }


    // create a venue
    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create a new venue' })
    @ApiBody({ type: CreateVenueDto })
    async createVenue(@Body() createVenueDto: CreateVenueDto): Promise<VenueResponseDto> {
        return this.venuesService.createVenue(createVenueDto);
    }


}
