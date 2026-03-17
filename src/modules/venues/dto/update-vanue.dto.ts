import { PartialType } from '@nestjs/swagger';
import { CreateVenueDto } from './create-vanue.dto';

export class UpdateVenueDto extends PartialType(CreateVenueDto) {}
