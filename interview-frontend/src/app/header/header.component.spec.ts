import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-city-form',
  template: `<form class="searchForm" (ngSubmit)="onSubmit()">
                <label for="cityName">
                    <input class="searchFormInput" type="text" name="cityName" id="cityName" placeholder="Type city" />
                </label>
                <button text="Search"></button>
            </form>`,
})
class MockSearchCityForm {
  cityName: string;
  @Output() onSearchCity = new EventEmitter<string>();

  onSubmit() {
    const validation = /[^a-zA-Z\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df]/.test(this.cityName.trim());

    if (!this.cityName.trim()) {
      alert('Please type a city name!')
      return;
    }
    
    if (validation) {
      alert('Only letters are allowed!');
      this.cityName = '';
      return;
    }


    this.onSearchCity.emit(this.cityName.trim());

    this.cityName = '';
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, MockSearchCityForm]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
