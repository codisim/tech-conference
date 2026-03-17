import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizerDto {
  @ApiProperty({ description: 'Name of the organizer', example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @ApiProperty({
    description: 'Company name of the organizer',
    example: 'Tech Events Ltd',
  })
  @IsString()
  @IsNotEmpty({ message: 'Company name cannot be empty.' })
  companyName: string;

  @ApiProperty({
    description: 'Contact information',
    example: 'contact@techevents.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'Contact info cannot be empty.' })
  contactInfo: string;
}
