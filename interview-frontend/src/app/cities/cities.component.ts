import { Component } from '@angular/core';
import { City } from '../City';
import { CITIES } from '../mock-cities';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  cities: City[] = CITIES;
}
