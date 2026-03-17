import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTicketTypeDto {
  @ApiProperty({
    description: 'Ticket type name',
    example: 'VIP',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @ApiProperty({
    description: 'Ticket price',
    example: 1500.5,
  })
  @IsNumber({}, { message: 'Price must be a number.' })
  @IsPositive({ message: 'Price must be positive.' })
  price: number;

  @ApiProperty({
    description: 'Total ticket quantity',
    example: 100,
  })
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity: number;

  @ApiProperty({
    description: 'Event ID',
    example: '22222222-2222-2222-2222-222222222222',
  })
  @IsString()
  eventId: string;
}
