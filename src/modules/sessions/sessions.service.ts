import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-sesion.dto';
import { SessionResponseDto } from './dto/session-response.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

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

    // // get all sessions (only admin)
    async getAllSessions(): Promise<SessionResponseDto[]> {
        try {
            const sessions = await this.prisma.session.findMany({
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

            return sessions;

        } catch (error) {
            console.error('Error fetching sessions:', error);
            throw new InternalServerErrorException('Failed to fetch sessions');
        }
    }

    // get all sessions for an event
    async getSessionsByEventId(eventId: string): Promise<SessionResponseDto[]> {
        try {
            const sessions = await this.prisma.session.findMany({
                where: { eventId },
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

            return sessions;

        } catch (error) {
            console.error('Error fetching sessions for event:', error);
            throw new InternalServerErrorException('Failed to fetch sessions for event');
        }
    }

    // update session (only admin)
    async updateSession(id: string, updateSessionDto: UpdateSessionDto): Promise<SessionResponseDto> {
        const { title, startTime, endTime, eventId } = updateSessionDto;

        try {
            const session = await this.prisma.session.update({
                where: { id },
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
            console.error('Error updating session:', error);
            throw new InternalServerErrorException('Failed to update session');
        }
    }

    // delete session (only admin)
    async deleteSession(id: string): Promise<{ message: string }> {
        try {
            await this.prisma.session.delete({
                where: { id }
            });

            return { message: 'Session deleted successfully' };
        } catch (error) {
            console.error('Error deleting session:', error);
            throw new InternalServerErrorException('Failed to delete session');
        }
    }

}
