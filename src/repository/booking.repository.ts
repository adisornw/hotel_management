
import { IBooking, INewBooking } from "src/interface/booking.interface";
import { IGuest } from "../interface/guest.interface";
import { GuestRepository } from "./guest.repository";

export class BookingRepository {
    private bookings: IBooking[] = [];
    constructor(
      
    ) { }

    find(): IBooking[] {
        return this.bookings
    }

    findBookingByGuestName(name:string):IBooking[]{
        return this.bookings.filter(_book=>_book.guestName == name)
    }

    findCurrentBookings(): IBooking[] {
        //? file only booking current use
        return this.bookings.filter(_book => !_book.checkoutAt)
    }

    findOneByRoomNo(roomNumber: string): IBooking {
        return this.bookings.find(_book => _book.roomNumber == roomNumber && !_book.checkoutAt)
    }

    findOneByKeycardNumber(keycardNumber: number): IBooking {
        let booking: IBooking = this.bookings.find(_book => _book.keycardNumber == keycardNumber && !_book.checkoutAt)
        return booking
    }


    update(booking: IBooking) {
        const bookIndex: number = this.bookings.findIndex(_book => _book.keycardNumber == booking.keycardNumber && !_book.checkoutAt)
        this.bookings[bookIndex] = { ...booking }
        return this.bookings[bookIndex]
    }

    save(newBooking: INewBooking): IBooking {
        this.bookings.push({
            ...newBooking
        })
        return newBooking
    }


} // end main