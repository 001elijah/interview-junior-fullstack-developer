import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-city-form',
  templateUrl: './search-city-form.component.html',
  styleUrls: ['./search-city-form.component.scss']
})
export class SearchCityFormComponent {
  @Input() handleSearch: any;
}
