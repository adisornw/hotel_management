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
    private guestService: GuestService,
  ) { }

  onApplicationBootstrap() {
    const inputDatas = fs.readFileSync('input.txt', 'utf8');
    let inputActions: any[] = inputDatas.split('\n')

    //? mapping list action to object
    //? [0] is actions
    // for (const input of inputActions) {
    //   const actions: any[] = input.split(' ');
    //   let result: string = '';
    //   switch (actions[0]) {
    //     case 'create_hotel':
    //       const numberOfFloor: number = actions[1]
    //       const numberRoomPerFloor: number = actions[2]
    //       const createHotelResult: string = this.hotelService.create(numberOfFloor, numberRoomPerFloor)
    //       console.log(createHotelResult);
    //       break;
    //     case 'book':
    //       const bookRoomNumber: string = actions[1]
    //       const guestBooking: IGuest = {
    //         name: actions[2],
    //         age: actions[3]
    //       }
    //       const bookResult: string = this.bookingService.makeBooking(bookRoomNumber, guestBooking)
    //       console.log(bookResult);
    //       break;
    //     case 'list_available_rooms':
    //       const avaliableRooms: IRoom[] = this.roomService.findRoomByStatus(roomStatuses.AVALIABLE);
    //       avaliableRooms.forEach(_room => {
    //         console.log(_room.roomNumber)
    //       })
    //       break;
    //     case 'checkout':
    //       const checkoutKeycard: IKeyCard = {
    //         number: actions[1]
    //       }
    //       const guestCheckout: IGuest = {
    //         name: actions[2]
    //       }
    //       const checkoutResult: string = this.bookingService.checkOutByKeycard(checkoutKeycard, guestCheckout)
    //       console.log(checkoutResult)
    //       break;
    //     case 'list_guest':
    //       const bookings: IBooking[] = this.bookingService.findCurrentBookings();
    //       const listGuest: string[] = []
    //       bookings.forEach(_book => {
    //         if (listGuest.some(_name => _name == _book.guestName)) return // no need to display duplicate name
    //         listGuest.push(_book.guestName)
    //       })
    //       console.log(listGuest.toString())
    //       break;
    //     case 'get_guest_in_room':
    //       const guestRoom: string = actions[1]
    //       const gustBooking: IBooking = this.bookingService.findOneByRoomNumber(guestRoom)
    //       console.log(gustBooking.guestName)
    //       break;
    //     case 'list_guest_by_age':
    //       const ageCondition:string = actions[1]
    //       const listAge: number = actions[2]
    //       this.guestService.listGuestByAge(listAge,ageCondition)

    //       break;
    //     case 'list_guest_by_floor':
    //       const guestFloor: number = actions[1]
    //       this.bookingService.findBookingByFloor(guestFloor)
    //       break;
    //     case 'checkout_guest_by_floor':
    //       const checkOutByFloorResult: string = this.bookingService.checkOutByFloor(actions[1])
    //       console.log(checkOutByFloorResult)
    //       break;
    //     case 'book_by_floor':
    //       const bookingFloor: number = actions[1];
    //       const guestFloorBooking: IGuest = {
    //         name: actions[2],
    //         age: actions[3]
    //       }
    //       const bookByFloorResult: string = this.bookingService.makeBookingByFloor(bookingFloor, guestFloorBooking)
    //       console.log(bookByFloorResult);
    //       break;
    //     default: // not do anything
    //   }
    // }
  } // end on on application bootstrap
}
