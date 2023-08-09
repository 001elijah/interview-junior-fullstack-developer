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
    const validation = /[^a-zA-Z\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df]/.test(this.cityName.trim());
    if (validation) {
      alert('Only letters are allowed!');
      this.cityName = '';
      return;
    }


    this.onSearchCity.emit(this.cityName.trim());

    this.cityName = '';
  }
}
