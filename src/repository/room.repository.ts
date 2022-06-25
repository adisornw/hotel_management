
import { roomStatuses } from "../room/room.enum";
import { IRoom } from "../interface/room.interface";

export class RoomRepository {
    private rooms: IRoom[] = [];
    constructor() { }

    find(): IRoom[] {
        return this.rooms
    }

    findByListRoomNumber(roomNumbers:string[]):IRoom[]{
        return this.rooms.filter(_room=>{
            return roomNumbers.some(_number=>_number == _room.roomNumber)
        })
    }

    findRoomsByStatus(status: roomStatuses): IRoom[] {
        return this.rooms.filter(_room => status == roomStatuses.AVALIABLE ? _room.isAvaliable : !_room.isAvaliable)
    }

    findOneByRoomNo(roomNumber: string): IRoom {
        return this.rooms.find(_room => _room.roomNumber == roomNumber)
    }

    findRoomsByFloor(floor: number): IRoom[] {
        return this.rooms.filter(_room => _room.floor == floor)
    }

    save(room: IRoom): IRoom {
        this.rooms.push(room)
        return room
    }


    create(room: IRoom): IRoom {
        this.rooms.push(room)
        return room
    }


    updateRoomStatus(roomNumber: string, status: roomStatuses) {
        const roomIndex: number = this.rooms.findIndex(_room => _room.roomNumber == roomNumber)
        if (roomIndex == -1) return `Room ${roomNumber} not found`
        this.rooms[roomIndex].isAvaliable = status == roomStatuses.AVALIABLE ? true : false
    }


} // end main