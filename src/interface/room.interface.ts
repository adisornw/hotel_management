import { IGuest } from "./guest.interface"
import { IKeyCard } from "./keycard.interface"

export interface IRoom {
    floor: number,
    number: number,
    roomNumber: string,
    isAvaliable: boolean,
    guest?: IGuest,
    keyCard?: IKeyCard
}