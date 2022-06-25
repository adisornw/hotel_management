// import { Test } from "@nestjs/testing";
// import { IGuest } from "src/interface/guest.interface";
// import { IKeyCard } from "src/interface/keycard.interface";
// import { IRoom } from "src/interface/room.interface";
// import { RoomService } from "./room.service";

// describe('Hotel Unit Test', () => {
//     let service: RoomService

//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             providers: [RoomService],
//         }).compile();

//         service = moduleRef.get<RoomService>(RoomService);
//     }) // end before each

//     it('room service shoule be define', () => {
//         expect(service).toBeDefined();
//     })

//     describe('Room Service Test Suit', () => {
//         it('booking room success case', () => {
//             const mockRoomBook: string = '203'
//             const mockGuest: IGuest = {
//                 name: 'Thor',
//             }
//             const mockKeyCard: IKeyCard = {
//                 number: '1',
//             }

//             const mockRoomBooked: IRoom = {
//                 roomNumber: '203',
//                 isAvaliable: true,
//                 floor: 2,
//                 number: 3
//             }

//             //mock return booked room
//             jest.spyOn(service, 'findOneByRoomNumber').mockReturnValue(mockRoomBooked)

//             const result: string = service.booking(mockRoomBook, mockGuest, mockKeyCard)
//             expect(result).toEqual(`Room ${mockRoomBook} is booked by ${mockGuest.name} with keycard number ${mockKeyCard.number}.`)
//         }) // end test create hotel

//         it('booking unavailable room', () => {
//             const mockRoomBook: string = '203'
//             const mockGuest: IGuest = {
//                 name: 'TonyStark',
//             }
//             const mockKeyCard: IKeyCard = {
//                 number: '3'
//             }

//             const mockRoomBooked: IRoom = {
//                 roomNumber: '203',
//                 isAvaliable: false,
//                 floor: 2,
//                 number: 3,
//                 guest: {
//                     name: 'Thor',
//                     age: 20
//                 },
//                 keyCard: {
//                     number: '1',
//                 }
//             }
//             //mock return booked room
//             jest.spyOn(service, 'findOneByRoomNumber').mockReturnValue(mockRoomBooked)

//             const result: string = service.booking(mockRoomBook, mockGuest, mockKeyCard)
//             expect(result).toEqual(`Cannot book room ${mockRoomBook} for ${mockGuest.name}, The room is currently booked by ${mockRoomBooked.guest.name}.`)
//         }) // end unavaliable book


//         it('check-out case', () => {
//             const mockKeyCard: IKeyCard = {
//                 number: '4'
//             }
//             const mockGuestCheckOut: IGuest = {
//                 name: 'TonyStark'
//             }

//             const mockRoomInfoByCard: IRoom = {
//                 roomNumber: '201',
//                 floor:2,
//                 number:1,
//                 isAvaliable: false,
//                 guest: {
//                     name: mockGuestCheckOut.name,
//                     age: 20
//                 },
//                 keyCard: mockKeyCard
//             }

//             //mock return booked room by card
//             jest.spyOn(service, 'findOneByKeyCard').mockReturnValue(mockRoomInfoByCard)

//             const result: string = service.checkOut(mockKeyCard, mockGuestCheckOut)
//             expect(result).toEqual(`Room ${mockRoomInfoByCard.roomNumber} is checkout.`)
//         }) // end

//         it('check out by another guest', () => {
//             const mockKeyCard: IKeyCard = {
//                 number: '1'
//             }
//             const mockGuestCheckOut: IGuest = {
//                 name: 'TonyStark'
//             }


//             const mockRoomInfoByCard: IRoom = {
//                 roomNumber: '201',
//                 floor:2,
//                 number:1,
//                 isAvaliable: false,
//                 guest: {
//                     name: 'Thor',
//                 },
//                 keyCard: mockKeyCard
//             }

//             //mock return booked room by card
//             jest.spyOn(service, 'findOneByKeyCard').mockReturnValue(mockRoomInfoByCard)
//             const result: string = service.checkOut(mockKeyCard, mockGuestCheckOut)
//             expect(result).toEqual(`Only ${mockRoomInfoByCard.guest.name} can checkout with keycard number ${mockKeyCard.number}.`)
//         }) // end check out by another guest
//     }) // end hotel suit
// }) // main test