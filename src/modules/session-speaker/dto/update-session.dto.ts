import { PartialType } from "@nestjs/swagger";
import { CreateSessionSpeakerDto } from "./create-session.dto";

export class UpdateSessionSpeakerDto extends PartialType(CreateSessionSpeakerDto) { }