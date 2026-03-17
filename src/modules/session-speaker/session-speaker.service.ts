import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionSpeakerDto } from './dto/create-session.dto';
import { SessionSpeakerResponseDto } from './dto/response-session.dto';
import { UpdateSessionSpeakerDto } from './dto/update-session.dto';

@Injectable()
export class SessionSpeakerService {
  constructor(private readonly prisma: PrismaService) {}

  // added a new Session Speaker (admin only)
  async addSessionSpeaker(
    createSessionSpeakerDto: CreateSessionSpeakerDto,
  ): Promise<SessionSpeakerResponseDto> {
    try {
      const sessionSpeaker = await this.prisma.sessionSpeaker.create({
        data: {
          sessionId: createSessionSpeakerDto.sessionId,
          speakerId: createSessionSpeakerDto.speakerId,
        },
        select: {
          id: true,
          sessionId: true,
          speakerId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return sessionSpeaker;
    } catch (error) {
      console.error('Error creating event: ', error);
      throw new InternalServerErrorException('Failed to create event');
    }
  }

  // get all session speaker (admin)
  async getAllSessionSpeakers(): Promise<SessionSpeakerResponseDto[]> {
    try {
      const sessionSpeaker = await this.prisma.sessionSpeaker.findMany({
        select: {
          id: true,
          sessionId: true,
          speakerId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return sessionSpeaker;
    } catch (error) {
      console.error('Error to retried all session-speaker');
      throw new InternalServerErrorException(
        'Failed to retried all session-speaker',
      );
    }
  }

  // get single session-speaker
  async getSingleSessionSpeaker(id: string): Promise<any> {
    try {
      const sessionSpeaker = await this.prisma.sessionSpeaker.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          sessionId: true,
          speakerId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return sessionSpeaker;
    } catch (error) {
      console.error('Error to retried single session-speaker');
      throw new InternalServerErrorException(
        'Failed to retried single session-speaker',
      );
    }
  }

  // update a session speaker
  async updateSessionSpeaker(
    id: string,
    updateSessionSpeakerDto: UpdateSessionSpeakerDto,
  ): Promise<SessionSpeakerResponseDto> {
    const existSessionSpeaker = await this.prisma.sessionSpeaker.findUnique({
      where: {
        id,
      },
    });

    if (!existSessionSpeaker)
      throw new NotFoundException('Session speaker not found');

    try {
      const sessionSpeaker = await this.prisma.sessionSpeaker.update({
        where: {
          id,
        },
        data: {
          sessionId: updateSessionSpeakerDto.sessionId,
          speakerId: updateSessionSpeakerDto.speakerId,
        },
        select: {
          id: true,
          sessionId: true,
          speakerId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return sessionSpeaker;
    } catch (error) {
      console.error('Error to update session-speaker');
      throw new InternalServerErrorException(
        'Failed to update session-speaker',
      );
    }
  }

  // delete
  async deleteSessionSpeaker(id: string): Promise<{ message: string }> {
    try {
      const existSessionSpeaker = await this.prisma.sessionSpeaker.findUnique({
        where: {
          id,
        },
      });

      if (!existSessionSpeaker)
        throw new NotFoundException('Session speaker not found');

      await this.prisma.sessionSpeaker.delete({
        where: {
          id,
        },
      });

      return { message: 'Session Speaker deleted successfully' };
    } catch (error) {
      console.error('Error deleting Session speaker:', error);
      throw new InternalServerErrorException(
        'Failed to delete Session speaker',
      );
    }
  }
}
