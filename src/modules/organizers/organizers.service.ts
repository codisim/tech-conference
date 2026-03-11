import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { OrganizerResponseDto } from './dto/organizer-response.dto';

@Injectable()
export class OrganizersService {
    constructor(private prisma: PrismaService) { }

    // Request organizer account (any user)
    async requestOrganizer(createOrganizerDto: CreateOrganizerDto, userId: string): Promise<OrganizerResponseDto> {
        const { name, companyName, contactInfo } = createOrganizerDto;

        // Check if user exists
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        // Check if organizer already exists
        const existingOrganizer = await this.prisma.organizer.findUnique({ where: { userId } });
        if (existingOrganizer) throw new BadRequestException('Organizer request already exists for this user');

        try {
            const organizer = await this.prisma.organizer.create({
                data: {
                    name,
                    companyName,
                    contactInfo,
                    userId,
                    status: 'PENDING',
                },
            });

            return organizer;
        } catch (error) {
            console.error('Error creating organizer request:', error);
            throw new InternalServerErrorException('Failed to create organizer request');
        }
    }
    // Admin approves/rejects organizer
    async updateOrganizerStatus(organizerId: string, status: 'PENDING' | 'APPROVED' | 'REJECTED'): Promise<OrganizerResponseDto> {
        // Check if organizer exists
        const organizer = await this.prisma.organizer.findUnique({ where: { id: organizerId } });
        if (!organizer) throw new NotFoundException('Organizer not found');

        try {
            const updatedOrganizer = await this.prisma.organizer.update({
                where: { id: organizerId },
                data: { status },
            });

            return updatedOrganizer;
        } catch (error) {
            console.error('Error updating organizer status:', error);
            throw new InternalServerErrorException('Failed to update organizer status');
        }
    }
}