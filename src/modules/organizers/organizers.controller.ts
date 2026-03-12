import { Body, Controller, HttpCode, Post, Patch, Param, Request, ForbiddenException, UseGuards } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { Roles } from 'src/common/decorators/role.decorators';
import { OrganizerStatus, UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { OrganizerResponseDto } from './dto/organizer-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';


@ApiTags('Organizers')
@Controller('organizers')
export class OrganizersController {
    constructor(private readonly organizersService: OrganizersService) { }

    // User requests organizer account
    @Post('request')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN, UserRole.USER)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Request organizer account',
        description: 'Any user can request to become an organizer'
    })
    @ApiResponse({
        status: 201,
        description: 'Organizer request submitted',
        type: OrganizerResponseDto
    })

    @ApiBody({ type: CreateOrganizerDto })
    async requestOrganizer(
        @Body() createOrganizerDto: CreateOrganizerDto,
        @Request() req: any
    ): Promise<OrganizerResponseDto> {
        const userId = req.user.id;
        return this.organizersService.requestOrganizer(createOrganizerDto, userId);
    }


    // Admin approves/rejects organizer
    @Patch('status/:id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update organizer status (admin)', description: 'Admin can approve or reject a pending organizer' })
    @ApiResponse({ 
        status: 200, 
        description: 'Organizer status updated', 
        type: OrganizerResponseDto 
    })
    async updateOrganizerStatus(
        @Param('id') organizerId: string,
        @Body('status') status: OrganizerStatus
    ): Promise<OrganizerResponseDto> {
        return this.organizersService.updateOrganizerStatus(organizerId, status);
    }
}