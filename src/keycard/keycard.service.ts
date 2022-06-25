import { Injectable } from "@nestjs/common";
import { IKeyCard } from "src/interface/keycard.interface";

@Injectable()
export class KeycardService {
    // mock hotel db
    keycards: IKeyCard[] = []

    constructor() {
    }

    create() {
        // let nextNumber: number = this.keycards.length + 1
        // let newKeycard: IKeyCard = {
        //     number: nextNumber,
        // }
        // this.keycards.push({...newKeycard})
    } // end 

}