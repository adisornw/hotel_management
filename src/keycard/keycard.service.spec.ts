import { Test } from "@nestjs/testing";
import { KeycardRepository } from "../repository/keycard.repository";
import { KeycardService } from "../keycard/keycard.service";
import { MockKeycardRepository } from "../test/mock-repository/keycard.repository.mock";

describe('Keycard Unit Test', () => {
    let service: KeycardService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                KeycardService,
                {
                    provide: KeycardRepository,
                    useValue: MockKeycardRepository,
                },
            ],
        }).compile();

        service = moduleRef.get<KeycardService>(KeycardService);
    }) // end before each

    it('service keycard should be define', () => {
        expect(service).toBeDefined();
    })
    describe('Keycard Create Test Suit', () => {
        it('create first card should return number card 1', () => {
            //mock init not have anycard in db
            MockKeycardRepository.find.mockReturnValue([])

            const result = service.create();

            expect(result).toMatchObject({
                number: 1
            })
        })

        it('create thrid card should return number card 3', () => {
            //mock init assume we already have 2 card in db
            MockKeycardRepository.find.mockReturnValue([
                { number: 1, isAvaliable: true },
                { number: 2, isAvaliable: true }
            ])

            const result = service.create();

            expect(result).toMatchObject({
                number: 3
            })
        })
    }) // end  suit
}) // main test