import { ApiProperty } from '@nestjs/swagger';
import { OrganizerStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateOrganizerStatusDto {
  @ApiProperty({
    enum: OrganizerStatus,
    example: OrganizerStatus.APPROVED,
    description: 'Organizer approval status',
  })
  @IsEnum(OrganizerStatus)
  status: OrganizerStatus;
}
