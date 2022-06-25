import { Injectable } from "@nestjs/common";
import { padNumber } from "../helper/number.helper";
import { IGuest } from "../interface/guest.interface";
import { IKeyCard } from "../interface/keycard.interface";
import { IRoom } from "../interface/room.interface";
import { roomStatuses } from "./room.enum";

@Injectable()
export class RoomService {
    //! mock room db
    rooms: IRoom[] = [] // end mock db

    constructor() { }

    find(): IRoom[] {
        return this.rooms
    }// end find rooms

    findRoomByStatus(status: roomStatuses) {
        if (status == roomStatuses.AVALIABLE) return this.rooms.filter(_room => _room.isAvaliable)
        else return this.rooms.filter(_room => !_room.isAvaliable)
    }

    findRoomByFloor(floor: number): IRoom[] {
        return this.rooms.filter(_room => _room.floor == floor)
    }

    findOneByRoomNumber(roomNumber: string): IRoom {
        return this.rooms.find(_room => _room.roomNumber == roomNumber)
    }


    create(floor: number) {
        //! find next room number
        let nextNumber: number = 1
        const floorRooms: IRoom[] = this.findRoomByFloor(floor);
        if (floorRooms.length > 0) nextNumber = floorRooms.length + 1
        let newRoom: IRoom = {
            floor,
            number: nextNumber,
            roomNumber: floor + padNumber(nextNumber),
            isAvaliable: true,
        }
        this.rooms.push({ ...newRoom })
    }

    updateRoomStatus(roomNumber: string, status: roomStatuses) {
        const roomIndex: number = this.rooms.findIndex(_room => _room.roomNumber == roomNumber)
        if (roomIndex == -1) return `Room ${roomNumber} not found`
        this.rooms[roomIndex].isAvaliable = status == roomStatuses.AVALIABLE ? true : false
    }


}