import { Injectable } from "@nestjs/common";
import { IKeyCard } from "../interface/keycard.interface";
import { KeycardRepository } from "../repository/keycard.repository";
import { keycardStatuses } from "./keycard.enum";

@Injectable()
export class KeycardService {
    // mock hotel db
    private keycards: IKeyCard[] = []

    constructor(
        private keycardRepository:KeycardRepository
    ) {
    }

    create():IKeyCard {
        const keycards:IKeyCard[] = this.keycardRepository.find();
        let nextNumber: number = keycards.length + 1

        let newKeycard: IKeyCard = {
            number: nextNumber,
            isAvaliable: true,
        }
        
         this.keycardRepository.save(newKeycard)
         return newKeycard
    } // end 

}