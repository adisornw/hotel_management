import { IKeyCard } from "../../interface/keycard.interface"

export const MockDataKeycards: IKeyCard[] = [
    { number: 1, isAvaliable: true },
    { number: 2, isAvaliable: true },
    { number: 3, isAvaliable: true },
    { number: 4, isAvaliable: true },
    { number: 5, isAvaliable: true },
    { number: 6, isAvaliable: true }
]

export const MockKeycardRepository = {
    find: jest.fn(():IKeyCard[] => {
        return [...MockDataKeycards]
    }),
    
    findAvaliableCard: jest.fn(():IKeyCard[]=>{
        return MockDataKeycards.filter(_card=>_card.isAvaliable)
    }),
    updateKeycardStatus:jest.fn(),
}