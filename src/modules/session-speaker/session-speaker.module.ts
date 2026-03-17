import { Module } from '@nestjs/common';
import { SessionSpeakerService } from './session-speaker.service';
import { SessionSpeakerController } from './session-speaker.controller';

@Module({
  providers: [SessionSpeakerService],
  controllers: [SessionSpeakerController],
})
export class SessionSpeakerModule {}
