import { ApiProperty } from '@nestjs/swagger';

export class TicketTypeResponseDto {
  @ApiProperty({
    description: 'TicketType ID',
    example: 'aaaabbbb-cccc-dddd-eeee-ffffffffffff',
  })
  id: string;

  @ApiProperty({
    description: 'Ticket type name',
    example: 'VIP',
  })
  name: string;

  @ApiProperty({
    description: 'Ticket price',
    example: 1500.5,
  })
  price: number;

  @ApiProperty({
    description: 'Total ticket quantity',
    example: 100,
  })
  quantity: number;

  @ApiProperty({
    description: 'Sold ticket count',
    example: 25,
  })
  soldQuantity: number;

  @ApiProperty({
    description: 'Event ID',
    example: '22222222-2222-2222-2222-222222222222',
  })
  eventId: string;

  @ApiProperty({
    description: 'Created at',
    example: '2026-03-16T10:20:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2026-03-16T11:00:00.000Z',
  })
  updatedAt: Date;
}
