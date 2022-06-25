
import { keycardStatuses } from "../keycard/keycard.enum";
import { IKeyCard } from "../interface/keycard.interface";

export class KeycardRepository {
    keycards: IKeyCard[] = [];
    constructor() { }

    find(): IKeyCard[] {
        return this.keycards
    }

    findAvaliableCard() {
        return this.keycards.filter(_key => _key.isAvaliable)
    }

    save(newKeyCard: IKeyCard): IKeyCard {
        this.keycards.push(newKeyCard)
        return newKeyCard
    }

    updateKeycardStatus(keycardNumber: number, status: keycardStatuses) {
        const keycardIndex: number = this.keycards.findIndex(_card => _card.number == keycardNumber)
        if (keycardIndex == -1) return 'Keycard not found'
        this.keycards[keycardIndex].isAvaliable = status == keycardStatuses.AVALIABLE ? true : false
    }

} // end main