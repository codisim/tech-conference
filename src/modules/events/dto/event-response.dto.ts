import { ApiProperty } from "@nestjs/swagger";

export class EventResponseDto {

  @ApiProperty({
    description: 'Event ID',
    example: '7d9f1f5c-2d11-4e5e-9c90-1e5a1b23c7aa'
  })
  id: string;

  @ApiProperty({
    description: 'Title of the event',
    example: 'Tech Conference 2026'
  })
  title: string;

  @ApiProperty({
    description: 'Event description',
    example: 'A conference about modern backend technologies'
  })
  description: string;

  @ApiProperty({
    description: 'Event start date',
    example: '2026-05-10T10:00:00Z'
  })
  startDate: Date;

  @ApiProperty({
    description: 'Event end date',
    example: '2026-05-10T18:00:00Z'
  })
  endDate: Date;

  @ApiProperty({
    description: 'Event location',
    example: 'Dhaka Convention Center'
  })
  location: string;

  @ApiProperty({
    description: 'Event creation timestamp',
    example: '2026-03-10T08:20:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Organizer ID',
    example: 'c3cbb9c1-19e5-4b78-9e7c-9c7c1a45b1d0'
  })
  organizerId: string;

  @ApiProperty({
    description: 'Venue ID',
    example: 'b2e1d0e4-42c2-41e7-a1c2-5b2d8e0f1d1a',
    required: false
  })
  venueId?: string | null;

  @ApiProperty({
    description: 'Organizer information',
    example: {
      id: 'c3cbb9c1-19e5-4b78-9e7c-9c7c1a45b1d0',
      name: 'Tech Events Organizer',
      companyName: 'Tech Events Ltd',
      contactInfo: 'contact@techevents.com',
      verified: true
    }
  })
  organizer: {
    id: string;
    name: string;
    companyName: string;
    contactInfo: string;
    verified: boolean;
  };

  @ApiProperty({
    description: 'Venue information',
    required: false,
    example: {
      id: 'b2e1d0e4-42c2-41e7-a1c2-5b2d8e0f1d1a',
      name: 'Dhaka Convention Center',
      address: 'Dhaka, Bangladesh',
      mapLink: 'https://maps.google.com/example'
    }
  })
  venue?: {
    id: string;
    name: string;
    address: string;
    mapLink?: string | null;
  } | null;
}