import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-city-form',
  templateUrl: './search-city-form.component.html',
  styleUrls: ['./search-city-form.component.scss']
})
export class SearchCityFormComponent {
  cityName: string;
  @Output() onSearchCity = new EventEmitter<string>();

  onSubmit() {
    if (!this.cityName.trim()) {
      alert('Please type a city name!')
      return;
    }

    if (Boolean(this.cityName.trim().search(/^[A-Za-z]+$/))) {
      alert('Only letters are allowed!')
      return;
    }


    this.onSearchCity.emit(this.cityName.trim());

    this.cityName = '';
  }
}