import { Test } from "@nestjs/testing";
import { KeycardService } from "../keycard/keycard.service";
import { RoomService } from "../room/room.service";
import { HotelService } from "./hotel.service";

describe('Hotel Unit Test', () => {
    let service: HotelService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [HotelService, RoomService,KeycardService],
        }).compile();

        service = moduleRef.get<HotelService>(HotelService);
    }) // end before each

    
    describe('Hotel Test Suit', () => {
        it('create hotel success case', () => {
            const mockNumberOfFloor: number = 2;
            const mockNumberOfRoomPerFloor: number = 3
            const result: string = service.create(mockNumberOfFloor, mockNumberOfRoomPerFloor)
            expect(result).toEqual(`Hotel created with ${mockNumberOfFloor} floor(s), ${mockNumberOfRoomPerFloor} room(s) per floor.`)
        }) // end test create hotel
    }) // end hotel suit
}) // main test