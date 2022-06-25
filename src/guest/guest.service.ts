import { Injectable } from "@nestjs/common";
import { IGuest } from "src/interface/guest.interface";

@Injectable()
export class GuestService {
    guests: IGuest[] = [];

    constructor(
    ) { }

    find(): IGuest[] {
        return this.guests
    }

    findOneByName(name: string): IGuest {
        return this.guests.find(_guest => _guest.name == name)
    }

    create(newGuest: IGuest): IGuest {
        this.guests.push({ ...newGuest })
        return newGuest
    }
}