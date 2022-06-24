import { IGuest } from "./guest.interface"
import { IKeyCard } from "./keycard.interface"

export interface IRoom {
    roomNumber: string,
    isAvaliable: boolean,
    guest?: IGuest,
    keyCard?: IKeyCard
}