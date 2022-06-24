import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HotelService } from './hotel/hotel.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

}
