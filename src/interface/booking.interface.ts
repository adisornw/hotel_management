import { IGuest } from "./guest.interface";
import { IKeyCard } from "./keycard.interface";
import { IRoom } from "./room.interface";

export interface IBooking {
    guest: IGuest,
    room: IRoom,
    keycard: IKeyCard,
    bookAt: string // DD-MM-YYYY HH:mm:ss
    checkoutAt?: string // optional
}