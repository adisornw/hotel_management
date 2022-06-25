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


    listGuestByAge(age:number,ageCondition?:string){
        let guests:IGuest[] = [];
        switch(ageCondition){
            case '<' : guests = this.guests.filter(_guest=> _guest.age < age)
            break;
            case '>' : guests = this.guests.filter(_guest=> _guest.age > age)
            default: guests = [...this.guests]
        }
        
        //! mapping result 
        let nameGuests:string[] = [];
        guests.forEach(_guest=>{
            nameGuests.push(_guest.name)
        })
        console.log(nameGuests.toString())
    }
}