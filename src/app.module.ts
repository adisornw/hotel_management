import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingService } from './booking/booking.service';
import { GuestService } from './guest/guest.service';
import { HotelService } from './hotel/hotel.service';
import { KeycardService } from './keycard/keycard.service';
import { BookingRepository } from './repository/booking.repository';
import { GuestRepository } from './repository/guest.repository';
import { KeycardRepository } from './repository/keycard.repository';
import { RoomRepository } from './repository/room.repository';
import { RoomService } from './room/room.service';

@Module({
  imports: [
    
  ],
  controllers: [AppController],
  providers: [
    BookingRepository,
    RoomRepository,
    KeycardRepository,
    GuestRepository,
    AppService, 
    HotelService, 
    RoomService, 
    KeycardService, 
    BookingService,
    GuestService
  ],
})
export class AppModule {

}
