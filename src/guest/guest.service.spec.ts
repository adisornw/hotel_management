import { Test } from "@nestjs/testing";
import { RoomRepository } from "../repository/room.repository";
import { BookingRepository } from "../repository/booking.repository";
import { GuestRepository } from "../repository/guest.repository";
import { GuestService } from "./guest.service";

describe('Hotel Unit Test', () => {
    let service: GuestService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                GuestService, 
                GuestRepository,
                BookingRepository,
                RoomRepository,
            ],
        }).compile();

        service = moduleRef.get<GuestService>(GuestService);
    }) // end before each

    it('service guest should be define',()=>{
        expect(service).toBeDefined();
    })
    // describe('Hotel Test Suit', () => {
    //     it('create hotel success case', () => {
    //         const mockNumberOfFloor: number = 2;
    //         const mockNumberOfRoomPerFloor: number = 3
    //         const result: string = service.create(mockNumberOfFloor, mockNumberOfRoomPerFloor)
    //         expect(result).toEqual(`Hotel created with ${mockNumberOfFloor} floor(s), ${mockNumberOfRoomPerFloor} room(s) per floor.`)
    //     }) // end test create hotel
    // }) // end hotel suit
}) // main test