import { Component, HostListener, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { CitiesComponent } from './cities/cities.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public getScreenWidth: any;
  public isUndoShown: boolean = false;
  
  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }
  @ViewChild(CitiesComponent) citiesComponent:CitiesComponent;
  handleSearch(cityName: string) {
    this.citiesComponent.page = environment.page;
    this.citiesComponent.isTheEndOfCollection = false;
    this.citiesComponent.error = false;
    this.citiesComponent.errorMessage = '';
      this.citiesComponent.searchCity(cityName);
  }
  handleUndo() {
    this.citiesComponent.undoSearch();
  }
}
