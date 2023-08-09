import { Component } from '@angular/core';
import { CityService } from "../services/city.service";
import { City } from '../City';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  cities: City[] = [];

  constructor(private cityService: CityService) { };

  // ngOnInit(): void {
    // this.cityService.getCities().subscribe(cities => this.cities = cities);
  // }

  searchCity(cityName: string) {
    if (!cityName) {
      return
    }
    this.cityService.getCity(cityName).subscribe(city => this.cities = city);
  }
}
