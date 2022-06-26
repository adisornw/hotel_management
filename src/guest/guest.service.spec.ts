import { Test } from "@nestjs/testing";
import { RoomRepository } from "../repository/room.repository";
import { BookingRepository } from "../repository/booking.repository";
import { GuestRepository } from "../repository/guest.repository";
import { GuestService } from "./guest.service";
import { IGuest } from "../interface/guest.interface";

describe('Guest Unit Test', () => {
    let service: GuestService
    let guestRepository: GuestRepository
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
        guestRepository = moduleRef.get<GuestRepository>(GuestRepository)
    }) // end before each

    it('service guest should be define', () => {
        expect(service).toBeDefined();
    })
    describe('Guest Test Suit', () => {
        it('list by age', () => {
            const mockAgeNeed: number = 18
            const mockConditionString: string = "<"
            //! mock data in db 4 person
            const mockGuests: IGuest[] = [{
                name: 'Thor',
                age: 32
            }, {
                name: 'StephenStrange',
                age: 36
            }, {
                name: 'PeterParker',
                age: 16
            }, {
                name: 'TonyStark',
                age: 48
            }]

            jest.spyOn(guestRepository, 'findByListName').mockReturnValue(mockGuests)
            const result: IGuest[] = service.listGuestByAge(mockAgeNeed, mockConditionString)
            
            expect(result.length).toEqual(1)
            expect(result[0]).toMatchObject({
                name: 'PeterParker',
                age: 16
            })
         
        }) // end test 
    }) 
}) // main test