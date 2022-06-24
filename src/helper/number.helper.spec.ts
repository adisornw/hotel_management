import { Test } from "@nestjs/testing";
import { padNumber } from "./number.helper";

describe('Number Helper Unit Test', () => {


    describe('Padding Number', () => {
        it('should return 01', () => {
            const result: string = padNumber(1)
            expect(result).toEqual('01')
        }) // end test create hotel

        it('should return 12', () => {
            const result: string = padNumber(12)
            expect(result).toEqual('12')
        }) // end test create hotel
    }) // end hotel suit
}) // main test