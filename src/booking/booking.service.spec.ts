// import { Test } from "@nestjs/testing";
// import { RoomService } from "../room/room.service";
// import { GuestService } from "../guest/guest.service";
// import { KeycardService } from "../keycard/keycard.service";
// import { BookingService } from "./booking.service";
// import { IGuest } from "../interface/guest.interface";
// import { BookingRepository } from "../repository/booking.repository";


// describe('Hotel Unit Test', () => {
//     let service: BookingService

//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             providers: [BookingService, GuestService, KeycardService, RoomService, BookingRepository],
//         }).compile();

//         service = moduleRef.get<BookingService>(BookingService);
//     }) // end before each


//     describe('Booking Test Suit', () => {
//         it('booking room success case', () => {
//             const mockGuest: IGuest = {
//                 name: 'Thor',
//                 age: 32,
//             }
//             service.book('203', mockGuest)
//         }) // end test create hotel
//     }) // end hotel suit
// }) // main test