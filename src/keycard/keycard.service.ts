import { Injectable } from "@nestjs/common";
import { IKeyCard } from "src/interface/keycard.interface";
import { keycardStatuses } from "./keycard.enum";

@Injectable()
export class KeycardService {
    // mock hotel db
    private keycards: IKeyCard[] = []

    constructor() {
    }

    findKeycardByStatus(status: keycardStatuses): IKeyCard[] {
        if (status == keycardStatuses.AVALIABLE) {
            return this.keycards.filter(_card => _card.isAvaliable)
        } else {
            return this.keycards.filter(_card => !_card.isAvaliable)
        }
    } // end find keycard by status

    updateKeycardStatus(keycard: IKeyCard, status: keycardStatuses) {
        const keycardIndex: number = this.keycards.findIndex(_card => _card.number == keycard.number)
        if (keycardIndex == -1) return 'Keycard not found'
        this.keycards[keycardIndex].isAvaliable = status == keycardStatuses.AVALIABLE ? true : false
    }

    create() {
        let nextNumber: number = this.keycards.length + 1
        let newKeycard: IKeyCard = {
            number: nextNumber,
            isAvaliable: true,
        }
        this.keycards.push({ ...newKeycard })
    } // end 

}