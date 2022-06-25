import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { HotelService } from './hotel/hotel.service';
import { IRoom } from './interface/room.interface';
import { roomStatuses } from './room/room.enum';
import { RoomService } from './room/room.service';


@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
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
          this.hotelService.create(numberOfFloor, numberRoomPerFloor)
          break;
        case 'book':
          break;
        case 'list_available_rooms':
          const avaliableRooms: IRoom[] = this.roomService.findRoomByStatus(roomStatuses.AVALIABLE);
          console.log(avaliableRooms)
          break;
        case 'checkout':
          break;
        case 'list_guest':
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
