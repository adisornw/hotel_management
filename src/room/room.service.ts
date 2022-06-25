import { Injectable } from "@nestjs/common";
import { RoomRepository } from "../repository/room.repository";
import { padNumber } from "../helper/number.helper";
import { IGuest } from "../interface/guest.interface";
import { IKeyCard } from "../interface/keycard.interface";
import { IRoom } from "../interface/room.interface";
import { roomStatuses } from "./room.enum";

@Injectable()
export class RoomService {
    //! mock room db
    rooms: IRoom[] = [] // end mock db

    constructor(
        private roomRepository: RoomRepository
    ) { }

    fetchAvaliableRooms(): string[] {
        const avaliableRooms:IRoom[] = this.roomRepository.findRoomsByStatus(roomStatuses.AVALIABLE);
        const avaliableRoomNumber:string[] = []
        avaliableRooms.forEach(_room=>avaliableRoomNumber.push(_room.roomNumber))

        return avaliableRoomNumber
    }

    create(floor: number) {
        //! find next room number
        let nextNumber: number = 1
        const floorRooms: IRoom[] = this.roomRepository.findRoomsByFloor(floor);
        if (floorRooms.length > 0) nextNumber = floorRooms.length + 1
        let newRoom: IRoom = {
            floor,
            number: nextNumber,
            roomNumber: floor + padNumber(nextNumber),
            isAvaliable: true,
        }
        this.roomRepository.save(newRoom)
    }
}