import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from './City';
import { CityService } from './services/city.service';

@Component({
  selector: 'app-header',
  template: `<header class="header">
                <div class="container">
                    <div class="wrapper">
                        <h1 class="title" *ngIf="screenWidth >= 768">{{title}}</h1>
                        <app-button *ngIf="showUndo" text="Undo" (btnClick)="handleUndo()"></app-button>
                    </div>
                </div>
            </header>`,
})
class MockHeader {
  title: string = 'City Searcher';
  showUndo: boolean = false;

  @Input() screenWidth: any;

  @Output() onSearchCity = new EventEmitter<string>();
  @Output() onUndoSearch = new EventEmitter();
}

@Component({
  selector: 'app-cities',
  template: `<section class="container">
                <div class="notFound" *ngIf="error">
                    <span>{{errorMessage}}</span>
                </div>
                <ul class="cities" *ngIf="!error && cities.length > 0">
                    <li class="city" *ngFor="let city of cities"><app-city-item [city]="city"></app-city-item></li>
                </ul>
            </section>`,
})
class MockCities {
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

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, MockHeader, MockCities]
    })

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
