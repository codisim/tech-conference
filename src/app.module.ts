import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { OrganizersModule } from './modules/organizers/organizers.module';
import { VenuesModule } from './modules/venues/venues.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { SpeakersModule } from './modules/speakers/speakers.module';
import { SessionSpeakerModule } from './modules/session-speaker/session-speaker.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { TicketTypeModule } from './modules/ticket-type/ticket-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    EventsModule,
    OrganizersModule,
    VenuesModule,
    SessionsModule,
    SpeakersModule,
    SessionSpeakerModule,
    TicketModule,
    TicketTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
