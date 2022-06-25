import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingService } from './booking/booking.service';
import { GuestService } from './guest/guest.service';
import { HotelService } from './hotel/hotel.service';
import { KeycardService } from './keycard/keycard.service';
import { RoomService } from './room/room.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HotelService, RoomService, KeycardService, GuestService,BookingService],
})
export class AppModule {

}
