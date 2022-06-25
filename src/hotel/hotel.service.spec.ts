import { Test } from "@nestjs/testing";
import { RoomRepository } from "../repository/room.repository";
import { KeycardService } from "../keycard/keycard.service";
import { RoomService } from "../room/room.service";
import { HotelService } from "./hotel.service";
import { KeycardRepository } from "../repository/keycard.repository";

describe('Hotel Unit Test', () => {
    let service: HotelService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                HotelService, 
                RoomService,
                KeycardService,
                RoomRepository,
                KeycardRepository
            ],
        }).compile();

        service = moduleRef.get<HotelService>(HotelService);
    }) // end before each

    it('service hotel should be define',()=>{
        expect(service).toBeDefined();
    })
    describe('Hotel Test Suit', () => {
        it('create hotel success case', () => {
            const mockNumberOfFloor: number = 2;
            const mockNumberOfRoomPerFloor: number = 3
            const result: string = service.create(mockNumberOfFloor, mockNumberOfRoomPerFloor)
            expect(result).toEqual(`Hotel created with ${mockNumberOfFloor} floor(s), ${mockNumberOfRoomPerFloor} room(s) per floor.`)
        }) // end test create hotel
    }) // end hotel suit
}) // main test