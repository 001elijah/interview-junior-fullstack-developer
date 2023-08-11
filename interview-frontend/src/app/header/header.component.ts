import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = 'City Searcher';
  // showUndo: boolean = false;

  @Input() screenWidth: any;
  @Input() showUndo: boolean;

  @Output() onSearchCity = new EventEmitter<string>();
  @Output() onUndoSearch = new EventEmitter();
  @Output() showUndoChange = new EventEmitter<boolean>();
  
  handleSearch(cityName: string) {
    this.showUndo = true;
    this.showUndoChange.emit(this.showUndo);
    this.onSearchCity.emit(cityName);
  }

  handleUndo() {
    this.showUndo = false;
    this.showUndoChange.emit(this.showUndo);
    this.onUndoSearch.emit();
  }
  ngOnInit() {}
}
