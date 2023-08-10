import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const citiesPath = path.join(__dirname, '..', '..', 'cities.json');

@Injectable()
export class CitiesService {
  private cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));

  getCities(cityName: string, page: number, limit: number) {
    if (cityName) {
      return this.cities
        .filter((city) =>
          city.cityName.toLowerCase().includes(cityName.toLocaleLowerCase()),
        )
        .slice((page - 1) * limit, page * limit);
    }
    return this.cities;
  }
}
