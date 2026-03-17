import { PartialType } from '@nestjs/swagger';
import { CreateSessionDto } from './create-sesion.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {}
