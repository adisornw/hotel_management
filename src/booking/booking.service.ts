import { Injectable } from "@nestjs/common";
import { keycardStatuses } from "../keycard/keycard.enum";
import { GuestService } from "../guest/guest.service";
import { IBooking, INewBooking } from "../interface/booking.interface";
import { IGuest } from "../interface/guest.interface";
import { IKeyCard } from "../interface/keycard.interface";
import { IRoom } from "../interface/room.interface";
import { BookingRepository } from "../repository/booking.repository";
import { RoomRepository } from "../repository/room.repository";
import { KeycardRepository } from "../repository/keycard.repository";
import { roomStatuses } from "../room/room.enum";
import { GuestRepository } from "../repository/guest.repository";

@Injectable()
export class BookingService {

    constructor(
        private guestService: GuestService,
        private bookRepository: BookingRepository,
        private roomRepository: RoomRepository,
        private keycardRepositry: KeycardRepository,
        private guestRepository: GuestRepository,
    ) { }

    fetch(): IBooking[] {
        return this.bookRepository.find();
    }

    book(roomNumber: string, guest: IGuest): string {
        let currentGuest: IGuest = this.guestRepository.findOneByName(guest.name)
        if (!currentGuest) {
            //! create new guest
            currentGuest = this.guestService.create(guest)
        }// end check guest

        const bookingRoom: IRoom = this.roomRepository.findOneByRoomNo(roomNumber)
        
        if (!bookingRoom.isAvaliable) {
            
            //! find who is using that room by booking history
            const booked: IBooking = this.bookRepository.findOneByRoomNo(roomNumber)
            if (!booked) return `Please call staff to check and update status room number ${roomNumber}`
            return `Cannot book room ${roomNumber} for ${guest.name}, The room is currently booked by ${booked.guestName}.`
        }
        
        const keycards: IKeyCard[] = this.keycardRepositry.findAvaliableCard()
        if (keycards.length == 0) return 'Cannot book room because keycard out of stock'

        let newBooking: INewBooking = {
            bookAt: new Date(),
            guestName: guest.name,
            roomNumber: roomNumber,
            keycardNumber: keycards[0].number,
        }

        //! new booking
        newBooking = this.bookRepository.save(newBooking)

        //! update keycard used
        this.keycardRepositry.updateKeycardStatus(keycards[0].number, keycardStatuses.UNAVALIBLE)

        //! update room unavaliable
        this.roomRepository.updateRoomStatus(roomNumber, roomStatuses.UNAVALIBLE)

        return `Room ${roomNumber} is booked by ${guest.name} with keycard number ${keycards[0].number}.`
    } // end book fn

    bookByFloor(floor: number, guest: IGuest): string {
        //! checking all room in floor are avaliable
        const rooms: IRoom[] = this.roomRepository.findRoomsByFloor(floor);
        if (rooms.some(_room => !_room.isAvaliable)) return `Cannot book floor ${floor} for ${guest.name}.`


        let listBookRoomNumber:string[] = [];
        let listKeyCardNumberUsage:number[] = [];
        for (const room of rooms) {
            const keycards: IKeyCard[] = this.keycardRepositry.findAvaliableCard()
            if (keycards.length == 0) return 'Cannot book room because keycard out of stock'
    
            let newBooking: INewBooking = {
                bookAt: new Date(),
                guestName: guest.name,
                roomNumber: room.roomNumber,
                keycardNumber: keycards[0].number,
            }
    
            //! new booking
            newBooking = this.bookRepository.save(newBooking)
    
            //! update keycard used
            this.keycardRepositry.updateKeycardStatus(keycards[0].number, keycardStatuses.UNAVALIBLE)
    
            //! update room unavaliable
            this.roomRepository.updateRoomStatus(room.roomNumber, roomStatuses.UNAVALIBLE)

            //! for display
            listBookRoomNumber.push(room.roomNumber)
            listKeyCardNumberUsage.push(keycards[0].number)
        }// end for..of booking

     
        return `Room ${listBookRoomNumber.toString()} are booked with keycard number ${listKeyCardNumberUsage.toString()}`;
    }

    checkout(keycardNumber: number, guest: IGuest): string {
        let booking: IBooking = this.bookRepository.findOneByKeycardNumber(keycardNumber)
        if (!booking) return `Please call staff to check and update key card number ${keycardNumber}`

        if (guest.name != booking.guestName) {
            return `Only ${booking.guestName} can checkout with keycard number ${keycardNumber}.`
        }

        //! update booking checkout time avaliable
        booking.checkoutAt = new Date();
        booking = this.bookRepository.update(booking)

        //! update room to avaliable
        this.roomRepository.updateRoomStatus(booking.roomNumber, roomStatuses.AVALIABLE)

        //! update keycard avaliable
        this.keycardRepositry.updateKeycardStatus(booking.keycardNumber, keycardStatuses.AVALIABLE)

        return `Room ${booking.roomNumber} is checkout.`;

    }// end checkout

    checkoutByFloor(floor: number): string {
        let bookings: IBooking[] = this.bookRepository.findCurrentBookings();
        //! do like join
        bookings.map(_book => {
            _book.guest = this.guestRepository.findOneByName(_book.guestName)
            _book.room = this.roomRepository.findOneByRoomNo(_book.roomNumber)
        })

        //! filter only floor select
        bookings = bookings.filter(_book => {
            return _book.room.floor == floor
        })

        const checkoutRoomNumbers: string[] = [];
        for (const book of bookings) {
            checkoutRoomNumbers.push(book.roomNumber)
            this.checkout(book.keycardNumber, book.guest)
        }

        return `Room ${checkoutRoomNumbers.toString()} are checkout`
    } // end check out by floor fn

}// end main class