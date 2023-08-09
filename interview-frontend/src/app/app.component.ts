import { Component, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { CitiesComponent } from './cities/cities.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public getScreenWidth: any;
  
  ngOnInit() {
      this.getScreenWidth = window.innerWidth;
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }
  @ViewChild(CitiesComponent) child:CitiesComponent;
  handleSearch(cityName: string) {
    this.child.searchCity(cityName);
  }
}
