import { Test } from "@nestjs/testing";
import { BookingRepository } from "../repository/booking.repository";
import { GuestService } from "../guest/guest.service";
import { BookingService } from "./booking.service";
import { RoomRepository } from "../repository/room.repository";
import { KeycardRepository } from "../repository/keycard.repository";
import { GuestRepository } from "../repository/guest.repository";
import { MockRoomRepository } from "../test/mock-repository/room.repository.mock";
import { MockKeycardRepository } from "../test/mock-repository/keycard.repository.mock";
import { IGuest } from "../interface/guest.interface";
import { MockBookingRepository } from "../test/mock-repository/book.repository.mock";
import { IBooking } from "src/interface/booking.interface";

describe('Hotel Unit Test', () => {
    let service: BookingService


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                BookingService,
                GuestService,
                {
                    provide: BookingRepository,
                    useValue: MockBookingRepository,
                },
                {
                    provide: RoomRepository,
                    useValue: MockRoomRepository,
                },
                {
                    provide: KeycardRepository,
                    useValue: MockKeycardRepository,
                },
                GuestRepository,
            ],
        }).compile();

        service = moduleRef.get<BookingService>(BookingService);
    }) // end before each

    it('service booking should be define', () => {
        expect(service).toBeDefined();
    })
    describe('Booking Test Suit', () => {
        it('booking room 203 with name Thor age 32', () => {
            const mockRoomBooking: string = '203'
            const mockGuest: IGuest = {
                name: 'Thor',
                age: 32
            }
            //! mock keycard nubmer 1 is avaliable
            MockKeycardRepository.findAvaliableCard.mockReturnValue([
                {
                    number: 1,
                    isAvaliable: true
                }
            ])
            const result: string = service.book(mockRoomBooking, mockGuest)
            expect(result).toEqual(`Room ${mockRoomBooking} is booked by ${mockGuest.name} with keycard number 1.`)
        }) // end test create hotel


        it('book faile because room 203 unavalibale', () => {
            const mockRoomBooking: string = '203'
            const mockGuest: IGuest = {
                name: 'TonyStark',
                age: 48
            }

            //! mock in case 203 not avaliable
            MockRoomRepository.findOneByRoomNo.mockReturnValue({
                floor: 2,
                isAvaliable: false,
                number: 3,
                roomNumber: '203'
            })

            //! mock book detail
            const mockBookedResult:IBooking = {
                guestName: 'Thor',
                roomNumber: '203',
                keycardNumber: 1,
                bookAt: new Date() 
            }
            MockBookingRepository.findOneByRoomNo.mockReturnValue(mockBookedResult)


            const result: string = service.book(mockRoomBooking, mockGuest)
            expect(result).toEqual(`Cannot book room ${mockRoomBooking} for ${mockGuest.name}, The room is currently booked by ${mockBookedResult.guestName}.`)
        })
    }) // end hotel suit
}) // main test