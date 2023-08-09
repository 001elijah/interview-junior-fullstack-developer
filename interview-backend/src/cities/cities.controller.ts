import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  @Get() getCities(@Query('cityName') cityName: string) {
    try {
      const cities = this.citiesService.getCities(cityName);
      if (cities.length === 0) throw new Error();
      return cities;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
