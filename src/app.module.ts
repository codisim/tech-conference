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
    VenuesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
