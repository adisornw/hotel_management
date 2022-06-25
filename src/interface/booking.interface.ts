import { IGuest } from "./guest.interface";
import { IKeyCard } from "./keycard.interface";
import { IRoom } from "./room.interface";

export interface IBooking {
    guestName: string,
    roomNumber: string,
    keycardNumber: string,
    bookAt: Date 
    checkoutAt?: Date // optional
}