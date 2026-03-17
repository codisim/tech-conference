import { ApiProperty } from '@nestjs/swagger';

export class SpeakerResponseDto {
  @ApiProperty({
    description: 'Speaker ID',
    example: '1a2b3c4d-5678-4f8a-9d1a-3b2c1e0f1234',
  })
  id: string;

  @ApiProperty({
    description: 'Speaker name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Speaker biography',
    example: 'John is a senior backend engineer with 10 years of experience.',
  })
  bio: string;

  @ApiProperty({
    description: 'Speaker photo URL',
    example: 'https://example.com/john-doe.jpg',
    required: false,
  })
  photo?: string | null;

  @ApiProperty({
    description: 'Speaker creation time',
    example: '2026-03-13T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Speaker last update time',
    example: '2026-03-13T12:00:00.000Z',
  })
  updatedAt: Date;
}
