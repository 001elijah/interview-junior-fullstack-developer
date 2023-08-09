import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = 'City Searcher';
  @Input() screenWidth: any;
  @Output() onSearchCity = new EventEmitter<string>();
  @Output() onUndoSearch = new EventEmitter();
  handleSearch(cityName: string) {
    this.onSearchCity.emit(cityName);
  }

  handleUndo() {
    this.onUndoSearch.emit();
  }
  ngOnInit() {}
}
