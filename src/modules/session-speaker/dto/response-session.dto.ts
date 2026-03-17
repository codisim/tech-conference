import { ApiProperty } from '@nestjs/swagger';

export class SessionSpeakerResponseDto {
  @ApiProperty({
    description: 'SessionSpeaker ID',
    example: '9c3b1c2e-8a9f-4b71-9e2b-1f2d3c4e5a6b',
  })
  id: string;

  @ApiProperty({
    description: 'Session ID',
    example: '7d9f1f5c-2d11-4e5e-9c90-1e5a1b23c7aa',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Speaker ID',
    example: '1a2b3c4d-5678-4f8a-9d1a-3b2c1e0f1234',
  })
  speakerId: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2026-03-15T10:20:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2026-03-15T11:00:00.000Z',
  })
  updatedAt: Date;
}
