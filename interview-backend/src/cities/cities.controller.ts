import { Controller, Get, Param, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  @Get() getCities() {
    const cities = this.citiesService.getCities();
    return cities;
  }
}
