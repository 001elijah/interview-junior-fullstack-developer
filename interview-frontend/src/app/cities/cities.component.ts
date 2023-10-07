import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { CityService } from "../services/city.service";
import { City } from '../City';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  cities: City[] = [];
  isLoading: boolean = false;
  page: number = environment.page;
  limit: number = environment.limit;
  error: boolean = false;
  errorMessage: string = '';
  currentMethod: Function;
  currentCityName: string = '';
  isTheEndOfCollection: boolean = false;

  constructor(private cityService: CityService) { };

  @Input() showUndo: boolean;
  @Output() showUndoChange = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.currentMethod = this.searchCities;
    this.searchCities();
  }

  searchCities() {
    this.isLoading = true;
    this.cityService.getCities(this.page, this.limit).subscribe({
      next: cities => {
        if (cities.length < this.limit) {
          this.isTheEndOfCollection = true;
        }
        this.cities.push(...cities);
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        this.error = true;
        this.errorMessage = error.message;
        if (this.errorMessage === 'No cities found upon your query. Make sure your query is not misspelled. Press "Undo" and try again.') {
          this.isTheEndOfCollection = true;
        }
      }
    });
  }

  searchCity(cityName: string) {
    this.currentMethod = this.searchCity;
    this.currentCityName = cityName;
    this.cityService.getCity(cityName, this.page, this.limit).subscribe({
      next: cities => {
        if (cities.length < this.limit) {
          this.isTheEndOfCollection = true;
        }
        this.error = false;
        this.errorMessage = '';
        if (this.page === environment.page) {
          this.cities = cities;
        } else {
          this.cities.push(...cities);
        }
      },
      error: (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
        if (this.errorMessage === 'No cities found upon your query. Make sure your query is not misspelled. Press "Undo" and try again.') {
          this.isTheEndOfCollection = true;
        }
        this.cities = [];
      }
    });
  }

  undoSearch() {
    this.error = false;
    this.errorMessage = '';
    this.page = environment.page
    this.isTheEndOfCollection = false;
    this.currentMethod = this.searchCities;
    this.cityService.getCities(this.page, this.limit).subscribe(cities => this.cities = cities);
  }

  handleLoadMore() {
    this.showUndo = true;
    this.page++;
    if (this.currentCityName === '') {
      this.currentMethod();
    } else {
      this.currentMethod(this.currentCityName);
    }
    this.showUndoChange.emit(this.showUndo);
  }
}
