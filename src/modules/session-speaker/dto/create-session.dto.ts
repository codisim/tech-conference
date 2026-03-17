import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSessionSpeakerDto {
  @ApiProperty({
    description: 'Session ID',
    example: '7d9f1f5c-2d11-4e5e-9c90-1e5a1b23c7aa',
  })
  @IsString()
  @IsNotEmpty({ message: 'Session ID is required.' })
  sessionId: string;

  @ApiProperty({
    description: 'Speaker ID',
    example: '1a2b3c4d-5678-4f8a-9d1a-3b2c1e0f1234',
  })
  @IsString()
  @IsNotEmpty({ message: 'Speaker ID is required.' })
  speakerId: string;
}
