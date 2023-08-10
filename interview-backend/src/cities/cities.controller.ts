import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  @Get() getCities(
    @Query('cityName') cityName: string,
    @Query('page') page: number | undefined = 1,
    @Query('limit') limit: number | undefined = 5,
  ) {
    try {
      const cities = this.citiesService.getCities(cityName, page, limit);
      if (cities.length === 0) throw new Error();
      return cities;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
