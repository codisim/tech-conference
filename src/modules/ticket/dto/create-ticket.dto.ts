import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTicketDto {
  @ApiProperty({
    description: 'User ID',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Event ID',
    example: '22222222-2222-2222-2222-222222222222',
  })
  @IsString()
  eventId: string;

  @ApiProperty({
    description: 'Ticket Type ID',
    example: '33333333-3333-3333-3333-333333333333',
  })
  @IsString()
  ticketTypeId: string;

  @ApiProperty({
    description: 'Order ID (optional)',
    example: '44444444-4444-4444-4444-444444444444',
    required: false,
  })
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiProperty({
    description: 'QR Code string',
    example: 'QR-ABC-123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  qrCode?: string;

  @ApiProperty({
    description: 'Ticket status',
    example: 'ACTIVE',
    required: false,
    enum: Status,
  })
  @IsOptional()
  @IsEnum(Status, { message: 'Invalid status value.' })
  status?: Status;
}
