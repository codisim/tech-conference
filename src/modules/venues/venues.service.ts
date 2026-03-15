import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVenueDto } from './dto/create-vanue.dto';
import { VenueResponseDto } from './dto/vanue-response.dto';
import { UpdateVenueDto } from './dto/update-vanue.dto';

@Injectable()
export class VenuesService {
    constructor(private prisma: PrismaService) { }

    // create a venue
    async createVenue(createVenueDto: CreateVenueDto): Promise<VenueResponseDto> {
        const { name, address, mapLink } = createVenueDto;

        try {
            const venue = await this.prisma.venue.create({
                data: {
                    name,
                    address,
                    mapLink
                },
                select: {
                    id: true,
                    name: true,
                    address: true,
                    mapLink: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return venue;
        } catch (error) {
            console.error('Error creating venue:', error);
            throw new InternalServerErrorException('Failed to create venue');
        }
    }

    // get all venues
    async getAllVenues(): Promise<VenueResponseDto[]> {
        try {
            const venues = await this.prisma.venue.findMany({
                select: {
                    id: true,
                    name: true,
                    address: true,
                    mapLink: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return venues;
        } catch (error) {
            console.error('Error fetching venues:', error);
            throw new InternalServerErrorException('Failed to fetch venues');
        }
    }

    // get a venue by id
    async getVenueById(id: string): Promise<VenueResponseDto> {
        try {
            const venue = await this.prisma.venue.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    address: true,
                    mapLink: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            if (!venue) {
                throw new NotFoundException('Venue not found');
            }

            return venue;
            
        } catch (error) {
            console.error('Error fetching venue by id:', error);
            throw new InternalServerErrorException('Failed to fetch venue');
        }
    }

    // update a venue by id
    async updateVenue(id: string, updateVenueDto: UpdateVenueDto): Promise<VenueResponseDto> {
        const { name, address, mapLink } = updateVenueDto;

        try {
            const venue = await this.prisma.venue.update({
                where: { id },
                data: {
                    name,
                    address,
                    mapLink
                },
                select: {
                    id: true,
                    name: true,
                    address: true,
                    mapLink: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return venue;
        } catch (error) {
            console.error('Error updating venue:', error);
            throw new InternalServerErrorException('Failed to update venue');
        } 
    }

    // delete a venue by id
    async deleteVenue(id: string) {
        try {

            const existingVenue = await this.prisma.venue.findUnique({
                where: { id }
            });

            if (!existingVenue) {
                throw new NotFoundException('Venue not found');
            }   

            await this.prisma.venue.delete({
                where: { id }
            });
            
            return { message: 'Venue deleted successfully' };
        } catch (error) {
            console.error('Error deleting venue:', error);
            throw new InternalServerErrorException('Failed to delete venue');
        }
    }

}
