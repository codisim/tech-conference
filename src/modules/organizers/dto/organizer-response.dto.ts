import { ApiProperty } from '@nestjs/swagger';
import { OrganizerStatus } from '@prisma/client';

export class OrganizerResponseDto {
  @ApiProperty({
    description: 'Organizer ID',
    example: '7d9f1f5c-2d11-4e5e-9c90-1e5a1b23c7aa',
  })
  id: string;

  @ApiProperty({
    description: 'Organizer name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Tech Events Ltd',
  })
  companyName: string;

  @ApiProperty({
    description: 'Contact information',
    example: 'contact@techevents.com',
  })
  contactInfo: string;

  @ApiProperty({
    description: 'Organizer account status',
    enum: OrganizerStatus,
    example: OrganizerStatus.PENDING,
  })
  status: OrganizerStatus;

  @ApiProperty({
    description: 'Organizer creation time',
    example: '2026-03-12T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User ID linked to organizer',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}
