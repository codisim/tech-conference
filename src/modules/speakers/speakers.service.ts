import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { SpeakerResponseDto } from './dto/response-speaker.dto';

@Injectable()
export class SpeakersService {
    constructor(private readonly prisma: PrismaService) { }

    // create a speaker
    async CreateSpeakerDto(createSpeakerDto: CreateSpeakerDto): Promise<SpeakerResponseDto> {
        const { name, bio } = createSpeakerDto;
        try {
            const speaker = await this.prisma.speaker.create({
                data: {
                    name,
                    bio,
                    photo: createSpeakerDto.photo || null,
                },
                select: {
                    id: true,
                    name: true,
                    bio: true,
                    photo: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return speaker;
        } catch (error) {
            console.error('Error creating speaker:', error);
            throw new InternalServerErrorException('Failed to create speaker');
        }
    }

    // get all speakers
    async getAllSpeakers(): Promise<SpeakerResponseDto[]> {
        try {
            const speakers = await this.prisma.speaker.findMany();
            return speakers;
        } catch (error) {
            console.error('Error fetching speakers:', error);
            throw new InternalServerErrorException('Failed to fetch speakers');
        }
    }

    // get a speaker
    async getSpeakerById(id: string): Promise<SpeakerResponseDto> {
        try {
            const speaker = await this.prisma.speaker.findUnique({
                where: { id },
            });

            if (!speaker)
                throw new NotFoundException('Speaker not found');

            return speaker;
        } catch (error) {
            console.error('Error fetching speaker:', error);
            throw new InternalServerErrorException('Failed to fetch speaker');
        }
    }
}
