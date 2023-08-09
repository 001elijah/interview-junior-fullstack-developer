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
  error: boolean = false;
  errorMessage: string = '';

  constructor(private cityService: CityService) { };

  ngOnInit(): void {
    this.cityService.getCities().subscribe(cities => this.cities = cities);
  }

  searchCity(cityName: string) {
    this.cityService.getCity(cityName).subscribe({
      next: city => {
        this.error = false;
        this.errorMessage = '';
        this.cities = city
      },
      error: (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
      }
    });
  }

  undoSearch() {
    this.error = false;
    this.errorMessage = '';
    this.cityService.getCities().subscribe(cities => this.cities = cities);
  }
}
