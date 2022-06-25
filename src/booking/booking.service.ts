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

    checkOutByKeycard(keycard: IKeyCard, guest: IGuest): string {
        const bookingIndex: number = this.bookings.findIndex(_book => {
            return _book.keycardNumber == keycard.number && !_book.checkoutAt
        })
     
        if(bookingIndex == -1) return `Please call staff to check and update key card number ${keycard.number}`
        const booking:IBooking = this.bookings[bookingIndex]

        if(guest.name != booking.guestName){
            return `Only ${booking.guestName} can checkout with keycard number ${keycard.number}.`
        }

        //! update checkout time
        this.bookings[bookingIndex].checkoutAt = new Date();

        //! update room avaliable
        this.roomService.updateRoomStatus(booking.roomNumber,roomStatuses.AVALIABLE)

        //! update keycard avaliable
        this.keycardService.updateKeycardStatus(keycard,keycardStatuses.AVALIABLE)

        return `Room ${booking.roomNumber} is checkout.`;
    }
}// end main class