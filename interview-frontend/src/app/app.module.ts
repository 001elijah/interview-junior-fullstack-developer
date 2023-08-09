import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { CitiesComponent } from './cities/cities.component';
import { CityItemComponent } from './city-item/city-item.component';
import { SearchCityFormComponent } from './search-city-form/search-city-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    CitiesComponent,
    CityItemComponent,
    SearchCityFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
