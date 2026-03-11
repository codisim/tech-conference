import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateEventDto {

  @ApiProperty({
    description: 'Title of the event',
    example: 'Tech Conference 2026',
  })
  @IsNotEmpty({ message: 'Title cannot be empty.' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the event',
    example: 'A conference about modern web technologies.',
  })
  @IsNotEmpty({ message: 'Description cannot be empty.' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Event start date and time',
    example: '2026-04-10T10:00:00Z',
  })
  @IsNotEmpty({ message: 'Start date is required.' })
  @IsDateString({}, { message: 'Start date must be a valid ISO date string.' })
  startDate: string;

  @ApiProperty({
    description: 'Event end date and time',
    example: '2026-04-10T18:00:00Z',
  })
  @IsNotEmpty({ message: 'End date is required.' })
  @IsDateString({}, { message: 'End date must be a valid ISO date string.' })
  endDate: string;

  @ApiProperty({
    description: 'Location of the event',
    example: 'Dhaka Convention Center',
  })
  @IsNotEmpty({ message: 'Location cannot be empty.' })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Organizer ID (UUID)',
    example: 'b6c7c9e1-8f7d-4f41-9a5b-4e2d1a9c0b22',
  })
  @IsNotEmpty({ message: 'Organizer ID is required.' })
  @IsUUID('4', { message: 'Organizer ID must be a valid UUID.' })
  organizerId: string;

  @ApiProperty({
    description: 'Venue ID (optional)',
    example: 'b6c7c9e1-8f7d-4f41-9a5b-4e2d1a9c0b99',
    required: false,
  })
  @IsOptional()
  @IsString()
  venueId?: string;
}