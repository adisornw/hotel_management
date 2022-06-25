import { IRoom } from "src/interface/room.interface"

export const MockDataRooms: IRoom[] = [
    { floor: 1, number: 1, roomNumber: '101', isAvaliable: true },
    { floor: 1, number: 2, roomNumber: '102', isAvaliable: true },
    { floor: 1, number: 3, roomNumber: '103', isAvaliable: true },
    { floor: 2, number: 1, roomNumber: '201', isAvaliable: true },
    { floor: 2, number: 2, roomNumber: '202', isAvaliable: true },
    { floor: 2, number: 3, roomNumber: '203', isAvaliable: true }
]
export const MockRoomRepository = {
    find: jest.fn(()=>{
        return [...MockDataRooms]
    }),

    findOneByRoomNo:jest.fn((roomNumber:string):IRoom=>{
        return MockDataRooms.find(_room=>_room.roomNumber == roomNumber)
    }),

    updateRoomStatus:jest.fn()
}