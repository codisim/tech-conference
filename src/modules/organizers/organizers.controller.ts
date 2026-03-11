import { Body, Controller, HttpCode, Post, Patch, Param, Request, ForbiddenException } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { OrganizerResponseDto } from './dto/organizer-response.dto';

@Controller('organizers')
export class OrganizersController {
    constructor(private readonly organizersService: OrganizersService) { }

    // User requests organizer account
    @Post('request')
    @HttpCode(201)
    @ApiOperation({ summary: 'Request organizer account (user)', description: 'Any user can request to become an organizer; status defaults to PENDING' })
    @ApiResponse({
        status: 201,
        description: 'Organizer request submitted',
        type: OrganizerResponseDto
    })

    async requestOrganizer(
        @Body() createOrganizerDto: CreateOrganizerDto,
        @Request() req
    ): Promise<OrganizerResponseDto> {
        const userId = req.user.id;
        return this.organizersService.requestOrganizer(createOrganizerDto, userId);
    }


    // Admin approves/rejects organizer
    @Patch('status/:id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update organizer status (admin)', description: 'Admin can approve or reject a pending organizer' })
    @ApiResponse({ status: 200, description: 'Organizer status updated', type: OrganizerResponseDto })
    async updateOrganizerStatus(
        @Param('id') organizerId: string,
        @Body('status') status: 'PENDING' | 'APPROVED' | 'REJECTED'
    ): Promise<OrganizerResponseDto> {
        return this.organizersService.updateOrganizerStatus(organizerId, status);
    }
}