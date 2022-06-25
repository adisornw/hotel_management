import { Injectable } from "@nestjs/common";
import { keycardStatuses } from "../keycard/keycard.enum";
import { GuestService } from "../guest/guest.service";
import { IBooking } from "../interface/booking.interface";
import { IGuest } from "../interface/guest.interface";
import { IKeyCard } from "../interface/keycard.interface";
import { IRoom } from "../interface/room.interface";
import { KeycardService } from "../keycard/keycard.service";
import { RoomService } from "../room/room.service";
import { roomStatuses } from "src/room/room.enum";

@Injectable()
export class BookingService {
    bookings: IBooking[] = [];
    constructor(
        private guestService: GuestService,
        private roomService: RoomService,
        private keycardService: KeycardService
    ) { }

    makeBooking(roomNumber: string, guest: IGuest):string {
        let currentGuest: IGuest = this.guestService.findOneByName(guest.name)
        if (!currentGuest) {
            //! create new guest
            currentGuest = this.guestService.create(guest)
        }// end check guest
        const bookingRoom: IRoom = this.roomService.findOneByRoomNumber(roomNumber)
        if (!bookingRoom.isAvaliable) {
            //! find who is using that room by booking history
            return `Cannot book room 203 for TonyStark, The room is currently booked by Thor.`
        }

        // find avaliable keycard
        const keycards: IKeyCard[] = this.keycardService.findKeycardByStatus(keycardStatuses.AVALIABLE)
        if(keycards.length == 0) return 'Cannot book room because keycard out of stock'

        // new booking list
        this.bookings.push({
            guestName: currentGuest.name,
            bookAt: new Date(),
            keycardNumber: '2',
            roomNumber: `${keycards[0].number}`,
        })

        // update keycard used
        this.keycardService.updateKeycardStatus(keycards[0],keycardStatuses.UNAVALIBLE)
        
        // update room unavaliable
        this.roomService.updateRoomStatus(roomNumber,roomStatuses.UNAVALIBLE)

        return `Room ${roomNumber} is booked by ${currentGuest.name} with keycard number ${keycards[0].number}.`
    } // end booking room
}