
import { IGuest } from "../interface/guest.interface";
export class GuestRepository {
    private guests: IGuest[] = [];

    constructor() { }

    find(): IGuest[] {
        return this.guests
    }

    findOneByName(name: string): IGuest {
        return this.guests.find(_guest => _guest.name == name)
    }

    findByListName(names: string[]): IGuest[] {
        return this.guests.filter(_guest => {
            return names.some(_name => _name == _guest.name)
        })
    }

    save(newGuest): IGuest {
        this.guests.push({ ...newGuest })
        return newGuest
    }

} // end main