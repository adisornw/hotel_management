import { Injectable } from "@nestjs/common";
import { IHotel } from "src/interface/hotel.interface";

@Injectable()
export class HotelService {
    // mock hotel db
    hotel:IHotel = {
        id:1,
        numberOfFloor:2,
        numberOfRoomPerFloor:3
    }

    constructor(){}
    
    create(numberOfFloor:number,numberOfRoomPerFloor:number):string{
        return `Hotel created with ${numberOfFloor} floor(s), ${numberOfRoomPerFloor} room(s) per floor.`
    }
}