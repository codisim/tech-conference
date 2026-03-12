import { PartialType } from "@nestjs/swagger";
import { CreateEventDto } from './crete-event.dto';

export class UpdatedEventDto extends PartialType(CreateEventDto){
    
}