import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { BookingService } from './booking/booking.service';
import { GuestService } from './guest/guest.service';
import { HotelService } from './hotel/hotel.service';
import { IBooking } from './interface/booking.interface';
import { IGuest } from './interface/guest.interface';
import { IKeyCard } from './interface/keycard.interface';
import { IRoom } from './interface/room.interface';
import { roomStatuses } from './room/room.enum';
import { RoomService } from './room/room.service';


@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private bookingService: BookingService,
    private guestService:GuestService,
  ) { }

  onApplicationBootstrap() {
    const inputDatas = fs.readFileSync('input.txt', 'utf8');
    let inputActions: any[] = inputDatas.split('\n')

    //? mapping list action to object
    //? [0] is actions
    for (const input of inputActions) {
      const actions: any[] = input.split(' ');
      switch (actions[0]) {
        case 'create_hotel':
          const numberOfFloor: number = actions[1]
          const numberRoomPerFloor: number = actions[2]
          const createHotelResult:string = this.hotelService.create(numberOfFloor, numberRoomPerFloor)
          console.log(createHotelResult);
          break;
        case 'book':
          const bookRoomNumber: string = actions[1]
          const guestBooking: IGuest = {
            name: actions[2],
            age: actions[3]
          }
          const bookResult: string = this.bookingService.makeBooking(bookRoomNumber, guestBooking)
          console.log(bookResult);
          break;
        case 'list_available_rooms':
          const avaliableRooms: IRoom[] = this.roomService.findRoomByStatus(roomStatuses.AVALIABLE);
          avaliableRooms.forEach(_room => {
            console.log(_room.roomNumber)
          })
          break;
        case 'checkout':
          const checkoutKeycard: IKeyCard = {
            number: actions[1]
          }
          const guestCheckout: IGuest = {
            name: actions[2]
          }
          const checkoutResult:string = this.bookingService.checkOutByKeycard(checkoutKeycard, guestCheckout)
          console.log(checkoutResult)
          break;
        case 'list_guest':
          const bookings:IBooking[] = this.bookingService.findCurrentBookings();
          const listGuest:string[] = []
          bookings.forEach(_book=>{
            listGuest.push(_book.guestName)
          })
          console.log(listGuest.toString())
          break;
        case 'get_guest_in_room':
          break;
        case 'list_guest_by_age':
          break;
        case 'list_guest_by_floor':
          break;
        case 'checkout_guest_by_floor':
          break;
        case 'book_by_floor':
          break;
        default: // not do anything
      }
    }
  } // end on on application bootstrap
}
