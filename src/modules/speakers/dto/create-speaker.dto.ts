import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSpeakerDto {
  @ApiProperty({
    description: 'Speaker name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @ApiProperty({
    description: 'Speaker biography',
    example: 'John is a senior backend engineer with 10 years of experience.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Bio cannot be empty.' })
  bio: string;

  @ApiProperty({
    description: 'Speaker photo URL',
    example: 'https://example.com/john-doe.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Photo must be a valid URL.' })
  photo?: string;
}
