import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateVenueDto {
  @ApiProperty({
    description: 'Venue name',
    example: 'Dhaka Convention Center',
  })
  @IsString()
  @IsNotEmpty({ message: 'Venue name cannot be empty.' })
  name: string;

  @ApiProperty({
    description: 'Venue address',
    example: 'Gulshan, Dhaka, Bangladesh',
  })
  @IsString()
  @IsNotEmpty({ message: 'Address cannot be empty.' })
  address: string;

  @ApiProperty({
    description: 'Google map link of the venue',
    example: 'https://maps.google.com/example',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Map link must be a valid URL.' })
  mapLink?: string;
}
