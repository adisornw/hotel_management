import { Injectable } from "@nestjs/common";
import { IGuest } from "../interface/guest.interface";
import { IKeyCard } from "../interface/keycard.interface";
import { IRoom } from "../interface/room.interface";
const enum statusRooms {
    UNAVALIBLE = 0,
    AVALIABLE = 1,
}
@Injectable()
export class RoomService {
    //! mock room db
    dbRooms: any[] = [] // end mock db

    constructor() { }

    find(status?: statusRooms) {
        switch (status) {
            case statusRooms.AVALIABLE: return []
            case statusRooms.UNAVALIBLE: return []
            default: return []
        }
    }// end find rooms

    findOneByRoomNumber(roomNumber: string): IRoom {
        return this.dbRooms.find(_room => _room.roomNumber == roomNumber)
    }

    findOneByKeyCard(keyCard: IKeyCard): IRoom {
        return
    }


    checkOut(keyCard: IKeyCard, guest: IGuest) {
        //check room
        const room: IRoom = this.findOneByKeyCard(keyCard)
        if (!room) return 'not found room'
        if (room.guest.name != guest.name) return `Only ${room.guest.name} can checkout with keycard number ${keyCard.number}.`
        return `Room ${room.roomNumber} is checkout.`
    }


    booking(roomNumber: string, guest: IGuest, keycard: IKeyCard): string {
        //check room
        const room: any = this.findOneByRoomNumber(roomNumber)
        if (!room) return 'not found room'
        if (!room.isAvaliable) return `Cannot book room ${roomNumber} for ${guest.name}, The room is currently booked by ${room.guest.name}.`

        return `Room ${roomNumber} is booked by ${guest.name} with keycard number ${keycard.number}.`
    }
}