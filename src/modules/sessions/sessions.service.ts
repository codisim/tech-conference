import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-sesion.dto';
import { SessionResponseDto } from './dto/session-response.dto';

@Injectable()
export class SessionsService {
    constructor(private readonly prisma: PrismaService) { }

    // create a new session
    async createSession(createSessionDto: CreateSessionDto): Promise<SessionResponseDto> {
        const { title, startTime, endTime, eventId } = createSessionDto;

        try {

            const session = await this.prisma.session.create({
                data: {
                    title,
                    startTime,
                    endTime,
                    eventId
                },
                select: {
                    id: true,
                    title: true,
                    startTime: true,
                    endTime: true,
                    eventId: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            return session;

        } catch (error) {
            console.error('Error creating session:', error);
            throw new InternalServerErrorException('Failed to create session');
        }
    }
}
