import { Injectable } from "@nestjs/common";
import { KeycardService } from "../keycard/keycard.service";
import { IHotel } from "../interface/hotel.interface";
import { RoomService } from "../room/room.service";

@Injectable()
export class HotelService {
    private hotel: IHotel;
    constructor(
        private roomService: RoomService,
        private keycardService: KeycardService
    ) { }

    create(numberOfFloor: number, numberOfRoomPerFloor: number): string {
        //! looping create room
        for (let floor = 1; floor <= numberOfFloor; floor++) {
            // //! loop floor
            for (let room = 1; room <= numberOfRoomPerFloor; room++) {
                this.roomService.create(floor)
                this.keycardService.create()
            }
        }

        this.hotel = {
            numberOfFloor: numberOfFloor,
            numberOfRoomPerFloor: numberOfRoomPerFloor
        }

        return `Hotel created with ${this.hotel.numberOfFloor} floor(s), ${this.hotel.numberOfRoomPerFloor} room(s) per floor.`
    }
}