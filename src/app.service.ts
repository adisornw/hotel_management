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
    for (const input of inputActions) {
      const actions: any[] = input.split(' ');
      switch (actions[0]) {
        case 'create_hotel':
          const numberOfFloor: number = actions[1]
          const numberRoomPerFloor: number = actions[2]
          const createHotelResult: string = this.hotelService.create(numberOfFloor, numberRoomPerFloor)
          console.log(createHotelResult);
          break;
        case 'book':
          const bookRoomNumber: string = actions[1]
          const guestBooking: IGuest = {
            name: actions[2],
            age: actions[3]
          }
          const bookResult: string = this.bookingService.book(bookRoomNumber, guestBooking)
          console.log(bookResult);
          break;
        case 'list_available_rooms':
          const avaliableRoomNumber: string[] = this.roomService.fetchAvaliableRooms();
          console.log(avaliableRoomNumber.toString())
          break;
        case 'checkout':
          const checkoutKeycard: IKeyCard = {
            number: actions[1]
          }
          const guestCheckout: IGuest = {
            name: actions[2]
          }
          const checkoutResult: string = this.bookingService.checkout(checkoutKeycard.number, guestCheckout)
          console.log(checkoutResult)
          break;
        case 'list_guest':
          const listGuestResult: IGuest[] = this.guestService.listGuest()
          //for display
          let listGuestName:string[] = []
          listGuestResult.forEach(_guest=>listGuestName.push(_guest.name))
          console.log(listGuestName.toString())
          break;
        case 'get_guest_in_room':
          const guestRoom: string = actions[1]
          const guestRoomName: IGuest = this.guestService.getGuestInRoom(guestRoom)
          console.log(guestRoomName.name)
          break;
        case 'list_guest_by_age':
          const ageCondition: string = actions[1]
          const numberOfAge: number = actions[2]
          const listGuestByAge: IGuest[] = this.guestService.listGuestByAge(numberOfAge, ageCondition)

          //! for display match with output expect
          const guestNameByAge: string[] = [];
          listGuestByAge.forEach(_guest => {
            guestNameByAge.push(_guest.name)
          })
          console.log(guestNameByAge.toString())
          break;
        case 'list_guest_by_floor':
          const guestFloor: number = actions[1]
          const guestsInFloor: IGuest[] = this.guestService.listGuestByFloor(guestFloor)
          //! for display match with output expect
          const guestsNameInFloor: string[] = [];
          guestsInFloor.forEach(_guest => {
            guestsNameInFloor.push(_guest.name)
          })
          console.log(guestsNameInFloor.toString())
          break;
        case 'checkout_guest_by_floor':
          const checkoutFloor: number = actions[1]
          const floorCheckoutResult: string = this.bookingService.checkoutByFloor(checkoutFloor)
          console.log(floorCheckoutResult)
          break;
        case 'book_by_floor':
          const bookingFloor: number = actions[1];
          const guestFloorBooking: IGuest = {
            name: actions[2],
            age: actions[3]
          }
          const bookByFloorResult:string = this.bookingService.bookByFloor(bookingFloor, guestFloorBooking)
          console.log(bookByFloorResult);
          break;
        default: // not do anything
      }
    }
  } // end on on application bootstrap
}
