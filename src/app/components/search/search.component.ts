import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchFilter: EventEmitter<any> = new EventEmitter();
  @Input() search!: string;

  constructor() { }

  ngOnInit(): void {
  }

  searchProducts() {
    this.searchFilter.emit({ 'filter': this.search });
  }

}
