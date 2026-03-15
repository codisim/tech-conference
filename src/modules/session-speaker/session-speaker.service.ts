import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionSpeakerDto } from './dto/create-session.dto';
import { SessionSpeakerResponseDto } from './dto/response-session.dto';

@Injectable()
export class SessionSpeakerService {
    constructor(private readonly prisma: PrismaService) { }

    // added a new Session Speaker (admin only)
    async addSessionSpeaker(createSessionSpeakerDto: CreateSessionSpeakerDto): Promise<SessionSpeakerResponseDto> {
        try {
            const sessionSpeaker = await this.prisma.sessionSpeaker.create({
                data: {
                    sessionId: createSessionSpeakerDto.sessionId,
                    speakerId: createSessionSpeakerDto.speakerId
                },
                select: {
                    id: true,
                    sessionId: true,
                    speakerId: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            return sessionSpeaker;
        } catch (error) {
            console.error('Error creating event: ', error);
            throw new InternalServerErrorException('Failed to create event')
        }
    }

}
