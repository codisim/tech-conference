import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class TicketResponseDto {
  @ApiProperty({
    description: 'Ticket ID',
    example: 'aaaabbbb-cccc-dddd-eeee-ffffffffffff',
  })
  id: string;

  @ApiProperty({
    description: 'QR Code',
    example: 'QR-ABC-123456',
    required: false,
  })
  qrCode?: string | null;

  @ApiProperty({
    description: 'Ticket status',
    example: 'ACTIVE',
    enum: Status,
  })
  status: Status;

  @ApiProperty({
    description: 'User ID',
    example: '11111111-1111-1111-1111-111111111111',
  })
  userId: string;

  @ApiProperty({
    description: 'Event ID',
    example: '22222222-2222-2222-2222-222222222222',
  })
  eventId: string;

  @ApiProperty({
    description: 'Ticket Type ID',
    example: '33333333-3333-3333-3333-333333333333',
  })
  ticketTypeId: string;

  @ApiProperty({
    description: 'Order ID',
    example: '44444444-4444-4444-4444-444444444444',
    required: false,
  })
  orderId?: string | null;

  @ApiProperty({
    description: 'Created at',
    example: '2026-03-15T10:20:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2026-03-15T11:00:00.000Z',
  })
  updatedAt: Date;
}
