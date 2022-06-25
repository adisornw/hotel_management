import { Injectable } from "@nestjs/common";
import { keycardStatuses } from "../keycard/keycard.enum";
import { GuestService } from "../guest/guest.service";
import { IBooking } from "../interface/booking.interface";
import { IGuest } from "../interface/guest.interface";
import { IKeyCard } from "../interface/keycard.interface";
import { IRoom } from "../interface/room.interface";
import { KeycardService } from "../keycard/keycard.service";
import { RoomService } from "../room/room.service";
import { roomStatuses } from "../room/room.enum";

@Injectable()
export class BookingService {
    bookings: IBooking[] = [];

    constructor(
        private guestService: GuestService,
        private roomService: RoomService,
        private keycardService: KeycardService,
    ) { }

    find() {
        return this.bookings
    }

    findOneByRoomNumber(roomNumber: string) {
        return this.bookings.find(_book => _book.roomNumber == roomNumber && !_book.checkoutAt)
    }

    findBookingByFloor(floor: number) {
        const rooms: IRoom[] = this.roomService.rooms.filter(_room => _room.floor == floor)
        let bookings: IBooking[] = this.bookings.filter(_booking => {
            return rooms.some(_room => _room.roomNumber == _booking.roomNumber) && !_booking.checkoutAt
        })
        
        let guestNameBookings:string[] = []; // for display
        for(const booking of bookings){
            guestNameBookings.push(booking.guestName)   
        }
        console.log(guestNameBookings.toString())
        return bookings
    }

    findCurrentBookings(): IBooking[] {
        return this.bookings.filter(_book => !_book.checkoutAt)
    }

    makeBooking(roomNumber: string, guest: IGuest): string {
        let currentGuest: IGuest = this.guestService.findOneByName(guest.name)
        if (!currentGuest) {
            //! create new guest
            currentGuest = this.guestService.create(guest)
        }// end check guest
        const bookingRoom: IRoom = this.roomService.findOneByRoomNumber(roomNumber)
        if (!bookingRoom.isAvaliable) {
            //! find who is using that room by booking history
            const booked: IBooking = this.bookings.find(_booking => _booking.roomNumber == roomNumber && !_booking.checkoutAt)
            if (!booked) return `Please call staff to check and update status room number ${roomNumber}`
            return `Cannot book room ${roomNumber} for ${guest.name}, The room is currently booked by ${booked.guestName}.`
        }

        // find avaliable keycard
        const keycards: IKeyCard[] = this.keycardService.findKeycardByStatus(keycardStatuses.AVALIABLE)
        if (keycards.length == 0) return 'Cannot book room because keycard out of stock'

        // new booking list
        this.bookings.push({
            guestName: currentGuest.name,
            bookAt: new Date(),
            keycardNumber: keycards[0].number,
            roomNumber: roomNumber,
        })

        // update keycard used
        this.keycardService.updateKeycardStatus(keycards[0], keycardStatuses.UNAVALIBLE)

        // update room unavaliable
        this.roomService.updateRoomStatus(roomNumber, roomStatuses.UNAVALIBLE)

        return `Room ${roomNumber} is booked by ${currentGuest.name} with keycard number ${keycards[0].number}.`
    } // end booking room

    makeBookingByFloor(floor: number, guest: IGuest): string {
        let rooms: IRoom[] = this.roomService.findRoomByFloor(floor)
        rooms = rooms.filter(_room => _room.isAvaliable) // only avaliable rooms

        //make booking
        for (const room of rooms) {
            this.makeBooking(room.roomNumber, guest)
        }

        let currentBookings: IBooking[] = this.findCurrentBookings()
        currentBookings = currentBookings.filter(_book => _book.guestName == guest.name && !_book.checkoutAt) // show only gust booking

        // make sure curren booking only the same floor
        currentBookings = currentBookings.filter(_book => {
            return rooms.some(_room => _room.roomNumber == _book.roomNumber)
        })

        // for display rooms number which have booking by this guest
        let usingKeycards: number[] = [];
        let bookingRooms: string[] = [];
        for (const book of currentBookings) {
            usingKeycards.push(book.keycardNumber)
            bookingRooms.push(book.roomNumber)
        }
        return `Room ${bookingRooms.toString()} are booked with keycard number ${usingKeycards.toString()}`
    }

    checkOutByKeycard(keycard: IKeyCard, guest: IGuest): string {
        const bookingIndex: number = this.bookings.findIndex(_book => {
            return _book.keycardNumber == keycard.number && !_book.checkoutAt
        })

        if (bookingIndex == -1) return `Please call staff to check and update key card number ${keycard.number}`
        const booking: IBooking = this.bookings[bookingIndex]

        if (guest.name != booking.guestName) {
            return `Only ${booking.guestName} can checkout with keycard number ${keycard.number}.`
        }

        //! update checkout time
        this.bookings[bookingIndex].checkoutAt = new Date();

        //! update room avaliable
        this.roomService.updateRoomStatus(booking.roomNumber, roomStatuses.AVALIABLE)

        //! update keycard avaliable
        this.keycardService.updateKeycardStatus(keycard, keycardStatuses.AVALIABLE)

        return `Room ${booking.roomNumber} is checkout.`;
    }

    checkOutByFloor(floor: number) {
        //! find rooms in floor
        let checkOutRoomNumber: string[] = [] // for display response
        const floorRooms: IRoom[] = this.roomService.rooms.filter(_room => _room.floor == floor && !_room.isAvaliable)
        for (const room of floorRooms) {
            const bookingIndex: number = this.bookings.findIndex(_book => _book.roomNumber == room.roomNumber)

            //! update booking checkout date time
            this.bookings[bookingIndex].checkoutAt = new Date();

            //! update room to avaliable
            this.roomService.updateRoomStatus(room.roomNumber, roomStatuses.AVALIABLE)

            //! update keycard to avaliable
            this.keycardService.updateKeycardStatus({
                number: this.bookings[bookingIndex].keycardNumber
            }, keycardStatuses.AVALIABLE)

            checkOutRoomNumber.push(room.roomNumber) // for display only
        } // end for...of

        return `Room ${checkOutRoomNumber.toString()} are checkout.`
    }
}// end main class