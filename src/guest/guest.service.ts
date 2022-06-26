import { Injectable } from "@nestjs/common";
import { IBooking } from "../interface/booking.interface";
import { IGuest } from "../interface/guest.interface";
import { IRoom } from "../interface/room.interface";
import { BookingRepository } from "../repository/booking.repository";
import { RoomRepository } from "../repository/room.repository";
import { GuestRepository } from "../repository/guest.repository";

@Injectable()
export class GuestService {

    constructor(
        private guestRepository: GuestRepository,
        private bookingRepository: BookingRepository,
        private roomRepository:RoomRepository,
    ) { }

    listGuest(): IGuest[] {
        let bookings: IBooking[] = [...this.bookingRepository.findCurrentBookings()];

        const allGuestName: string[] = [];   //! for display 
        let guests:IGuest[] =[]
        //mapping booking to guests
        bookings.map(_book => {
            // allGuestName.push(_book.guestName)
            const guest: IGuest = this.guestRepository.findOneByName(_book.guestName)
            guests.push(guest)
            // if (guest) _book.guest = { ...guest }
        })
        return guests
        // return allGuestName.toString();
    }

    getGuestInRoom(roomNumber: string): IGuest {
        const booking: IBooking = this.bookingRepository.findOneByRoomNo(roomNumber)
        const guest: IGuest = this.guestRepository.findOneByName(booking.guestName)
        return guest
    }

    listGuestByAge(age: number, ageCondition?: string):IGuest[] {
        //mapping booking with guest flow like do sql join
        let bookings: IBooking[] = this.bookingRepository.findCurrentBookings();
        
        const listGuestName: string[] = []
        bookings.forEach(_book => listGuestName.push(_book.guestName))


        let guests: IGuest[] = this.guestRepository.findByListName(listGuestName)

        switch(ageCondition){
            case '<': guests = guests.filter(_guest=>_guest.age < age)
            break;
            case '>': guests = guests.filter(_guest=>_guest.age > age)
            break;
            default: // do nothing
        }
        return guests
    }

    listGuestByFloor(floor:number):IGuest[]{
        let bookings: IBooking[] = this.bookingRepository.findCurrentBookings();

        //! do like join
        bookings.map(_book=>{
            _book.guest = this.guestRepository.findOneByName(_book.guestName)
            _book.room = this.roomRepository.findOneByRoomNo(_book.roomNumber)
        })

        //filter by floor
        bookings = bookings.filter(_book=>{
            return _book.room && _book.room.floor == floor
        })

        //mapping to guests
        let guests:IGuest[] = [];
        bookings.forEach(_book=>{
            guests.push({..._book.guest})
        })
        return guests
        // return rooms.filter(_room=>_room.floor == floor)
    }

    create(newGuest: IGuest): IGuest {
        this.guestRepository.save(newGuest)
        return newGuest
    }
}