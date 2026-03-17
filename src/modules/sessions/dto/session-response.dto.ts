import { ApiProperty } from '@nestjs/swagger';

export class SessionResponseDto {
  @ApiProperty({
    description: 'Session ID',
    example: '1a2b3c4d-5678-4f8a-9d1a-3b2c1e0f1234',
  })
  id: string;

  @ApiProperty({
    description: 'Session title',
    example: 'Introduction to NestJS',
  })
  title: string;

  @ApiProperty({
    description: 'Session start time',
    example: '2026-05-10T10:00:00.000Z',
  })
  startTime: Date;

  @ApiProperty({
    description: 'Session end time',
    example: '2026-05-10T11:00:00.000Z',
  })
  endTime: Date;

  @ApiProperty({
    description: 'Event ID this session belongs to',
    example: '7d9f1f5c-2d11-4e5e-9c90-1e5a1b23c7aa',
  })
  eventId: string;

  @ApiProperty({
    description: 'Session creation timestamp',
    example: '2026-03-13T10:20:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Session last update timestamp',
    example: '2026-03-13T11:00:00.000Z',
  })
  updatedAt: Date;
}
