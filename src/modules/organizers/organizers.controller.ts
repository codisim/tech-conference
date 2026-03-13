import { Body, Controller, HttpCode, Post, Patch, Param, Request, ForbiddenException, UseGuards, Get } from '@nestjs/common';
import { OrganizersService } from './organizers.service';
import { Roles } from 'src/common/decorators/role.decorators';
import { OrganizerStatus, UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { OrganizerResponseDto } from './dto/organizer-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { UpdateOrganizerStatusDto } from './dto/update-organizer-status.dto';
import { OrganizerAprovedResponseDto } from './dto/organizer-aproved-response.dto';


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
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({
        summary: 'Update organizer status (admin)',
        description: 'Admin can approve or reject a pending organizer'
    })
    @ApiResponse({
        status: 200,
        description: 'Organizer status updated',
        type: OrganizerAprovedResponseDto,
    })
    @ApiBody({ type: UpdateOrganizerStatusDto })

    async updateOrganizerStatus(
        @Param('id') organizerId: string,
        @Body() body: UpdateOrganizerStatusDto
    ): Promise<OrganizerResponseDto> {

        return this.organizersService.updateOrganizerStatus(
            organizerId,
            body.status
        );
    }

    // get all organizer (admin)
    @Get()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Get all organizers (admin)'
    })

    @ApiResponse({
        status: 200,
        description: 'List of organizers',
        type: [OrganizerResponseDto],
    })

    @ApiResponse({
        status: 401,
        description: 'Unauthorized. The user is not authenticated or the token is invalid.'
    })


    @ApiResponse({
        status: 403,
        description: 'Forbidden. Only admins can access this endpoint.',
    })


    async getAllOrganizers(): Promise<OrganizerResponseDto[]> {
        return this.organizersService.getAllOrganizers();
    }


    // get single organizer
    @Get(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
    @ApiOperation({
        summary: 'Get organizer by ID',
        description: 'Admin can view any organizer. Organizers can view their own status.'
    })
    @ApiResponse({
        status: 200,
        description: 'Organizer details',
        type: OrganizerResponseDto,
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden. Only admins or the organizer themselves can access this endpoint.',
    })
    async getOrganizerById(
        @Param('id') organizerId: string,
        @Request() req: any
    ): Promise<OrganizerResponseDto> {
        const userId = req.user.id;
        const userRole = req.user.role;

        // Admins can view any organizer, organizers can only view their own status
        if (userRole === UserRole.ORGANIZER && userId !== organizerId) {
            throw new ForbiddenException('You can only view your own organizer status');
        }

        return this.organizersService.getOrganizerById(organizerId);
    }
}