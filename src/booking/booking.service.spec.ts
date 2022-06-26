import { Test } from "@nestjs/testing";
import { BookingRepository } from "../repository/booking.repository";
import { GuestService } from "../guest/guest.service";
import { BookingService } from "./booking.service";
import { RoomRepository } from "../repository/room.repository";
import { KeycardRepository } from "../repository/keycard.repository";
import { GuestRepository } from "../repository/guest.repository";
import { MockRoomRepository } from "../test/mock-repository/room.repository.mock";
import { MockDataKeycards, MockKeycardRepository } from "../test/mock-repository/keycard.repository.mock";
import { IGuest } from "../interface/guest.interface";
import { MockBookingRepository } from "../test/mock-repository/book.repository.mock";
import { IBooking } from "../interface/booking.interface";
import { IKeyCard } from "../interface/keycard.interface";
import { IRoom } from "../interface/room.interface";

describe('Booking Unit Test', () => {
    let service: BookingService

    let keycardRepository: KeycardRepository
    const mockKeycards: IKeyCard[] = [...MockDataKeycards]
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
                KeycardRepository,
                // {
                //     provide: KeycardRepository,
                //     useValue: MockKeycardRepository,
                // },
                GuestRepository,
            ],
        }).compile();

        service = moduleRef.get<BookingService>(BookingService);
        keycardRepository = moduleRef.get<KeycardRepository>(KeycardRepository)

        //! mock card value
        mockKeycards.forEach(_keycard => {
            keycardRepository.save({
                number: _keycard.number,
                isAvaliable: true
            })
        })

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
            const mockBookedResult: IBooking = {
                guestName: 'Thor',
                roomNumber: '203',
                keycardNumber: 1,
                bookAt: new Date()
            }
            MockBookingRepository.findOneByRoomNo.mockReturnValue(mockBookedResult)


            const result: string = service.book(mockRoomBooking, mockGuest)
            expect(result).toEqual(`Cannot book room ${mockRoomBooking} for ${mockGuest.name}, The room is currently booked by ${mockBookedResult.guestName}.`)
        })


        it('booking by floor 1 should sucess', () => {
            const mockBookFloor: number = 1;
            const mockGuest: IGuest = {
                name: 'TonyStark',
                age: 48
            }

            const mockRoomByFloor: IRoom[] = [{
                floor: 1,
                isAvaliable: true,
                number: 1,
                roomNumber: '101'
            },
            {
                floor: 1,
                isAvaliable: true,
                number: 2,
                roomNumber: '102'
            },
            {
                floor: 1,
                isAvaliable: true,
                number: 3,
                roomNumber: '103'
            }]

            MockRoomRepository.findRoomsByFloor.mockReturnValue(mockRoomByFloor)
            const result = service.bookByFloor(mockBookFloor, mockGuest)
            expect(result).toEqual(`Room 101,102,103 are booked with keycard number 1,2,3`)
        })

        it('booking by floor 2 should  fail becuase some room not avaliable', () => {
            const mockBookFloor: number = 2;
            const mockGuest: IGuest = {
                name: 'TonyStark',
                age: 48
            }

            const mockRoomByFloor: IRoom[] = [{
                floor: 2,
                isAvaliable: true,
                number: 1,
                roomNumber: '201'
            },
            {
                floor: 2,
                isAvaliable: true,
                number: 2,
                roomNumber: '202'
            },
            {
                floor: 2,
                isAvaliable: false,
                number: 3,
                roomNumber: '203'
            }]

            MockRoomRepository.findRoomsByFloor.mockReturnValue(mockRoomByFloor)
            const result = service.bookByFloor(mockBookFloor, mockGuest)
            expect(result).toEqual(`Cannot book floor ${mockBookFloor} for ${mockGuest.name}.`)
        })
    }) // end hotel suit


    describe('Check-Out Test Suit', () => {
        it('check-out success case', () => {
            const mockKeycard: IKeyCard = { number: 4 }
            const mockGuest: IGuest = {
                name: 'TonyStark'
            }

            //! mock find booking by card
            const mockBooked: IBooking = {
                guestName: 'TonyStark',
                roomNumber: '201',
                keycardNumber: 4,
                bookAt: new Date()
            }

            MockBookingRepository.findOneByKeycardNumber.mockReturnValue(mockBooked)

            const result = service.checkout(mockKeycard.number, mockGuest)
            expect(result).toEqual(`Room ${mockBooked.roomNumber} is checkout.`)
        })

        it('check-out with other guest faile case', () => {
            const mockKeycard: IKeyCard = { number: 1 }
            const mockGuest: IGuest = {
                name: 'TonyStark'
            }

            //! mock find booking by card
            const mockBooked: IBooking = {
                guestName: 'Thor',
                roomNumber: '201',
                keycardNumber: 1,
                bookAt: new Date()
            }

            MockBookingRepository.findOneByKeycardNumber.mockReturnValue(mockBooked)

            const result = service.checkout(mockKeycard.number, mockGuest)
            expect(result).toEqual(`Only ${mockBooked.guestName} can checkout with keycard number ${mockBooked.keycardNumber}.`)
        })
    })
}) // main test