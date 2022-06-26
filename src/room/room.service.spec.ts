import { Test } from "@nestjs/testing";
import exp from "constants";
import { IRoom } from "src/interface/room.interface";
import { RoomRepository } from "../repository/room.repository";
import { RoomService } from "./room.service";

describe('Guest Unit Test', () => {
    let service: RoomService
    let roomRepository: RoomRepository
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                RoomService,
                RoomRepository,
            ],
        }).compile();

        service = moduleRef.get<RoomService>(RoomService);
        roomRepository = moduleRef.get<RoomRepository>(RoomRepository)
    }) // end before each

    it('service room should be define', () => {
        expect(service).toBeDefined();
    })
    describe('Room Test Suit', () => {

        it('fetch avaliable room should return room 103', () => {
            const mockRooms: IRoom[] = [
                {
                    floor: 1,
                    isAvaliable: false,
                    number: 1,
                    roomNumber: '101'
                },
                {
                    floor: 1,
                    isAvaliable: false,
                    number: 2,
                    roomNumber: '102'
                },
                {
                    floor: 1,
                    isAvaliable: true,
                    number: 3,
                    roomNumber: '103'
                },
                {
                    floor: 2,
                    isAvaliable: false,
                    number: 1,
                    roomNumber: '201'
                }
            ]

            // mock create rooms
            mockRooms.forEach(_room=>roomRepository.save(_room))

            const result:string[] = service.fetchAvaliableRooms()
            expect(result.length).toBe(1);
            expect(result[0]).toEqual('103')
        })

    }) // end hotel suit
}) // main test