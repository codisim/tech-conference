import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VenueResponseDto {
  @ApiProperty({
    description: 'Venue ID',
    example: '7d9f1f5c-2d11-4e5e-9c90-1e5a1b23c7aa',
  })
  id: string;

  @ApiProperty({
    description: 'Venue name',
    example: 'Dhaka Convention Center',
  })
  name: string;

  @ApiProperty({
    description: 'Venue address',
    example: 'Gulshan, Dhaka, Bangladesh',
  })
  address: string;

  @ApiProperty({
    description: 'Google map link',
    example: 'https://maps.google.com/example',
    required: false,
  })
  @ApiPropertyOptional()
  mapLink?: string | null;

  @ApiProperty({
    description: 'Venue creation time',
    example: '2026-03-12T10:20:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Venue last update time',
    example: '2026-03-12T12:00:00.000Z',
  })
  updatedAt: Date;
}
