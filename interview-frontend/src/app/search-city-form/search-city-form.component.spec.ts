import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchCityFormComponent } from './search-city-form.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button
                    *ngIf="text === 'Search'"
                    type="submit"
                    class="btn"
                >
                    {{text}}
                </button>
                <button
                    *ngIf="text === 'Undo'"
                    type="'button"
                    class="undoBtn"
                    (click)="onClick()"
                >
                    {{text}}
                </button>
                `,
})
export class MockButton {
  @Input() text: string;
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}

describe('SearchCityFormComponent', () => {
  let component: SearchCityFormComponent;
  let fixture: ComponentFixture<SearchCityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCityFormComponent, MockButton],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(SearchCityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
