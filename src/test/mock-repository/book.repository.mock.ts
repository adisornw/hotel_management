import { IBooking } from "src/interface/booking.interface"
export const MockDataBookings: IBooking[] = [];
export const MockBookingRepository = {
    find: jest.fn((): IBooking[] => {
        return [...MockDataBookings]
    }),
    findOneByRoomNo:jest.fn(),
    findOneByKeycardNumber:jest.fn(),
    update:jest.fn((updBooking:IBooking)=>{
        return updBooking
    }),
    save:jest.fn()
}