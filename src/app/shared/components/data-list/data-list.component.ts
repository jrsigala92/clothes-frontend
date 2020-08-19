import { Component, OnInit, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { Data } from '@angular/router';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  @Input() data:any[];
  @Input() columns:any[];
  @Output() onItemSelect:EventEmitter<any> = new EventEmitter();
  filteredData:any[];
  constructor() { }

  ngOnInit(): void {
    // this.filteredData = this.data.slice();
  }

  ngOnChanges(changes:any){
    if (changes.data && this.data) {
      console.log(changes.data);
      this.filteredData = this.data.slice();
    }
  }

  selectItem(item){
    console.log('seleccionado', item);
    this.onItemSelect.emit(item)
  }

  filterData(query:string){
    console.log('buscar', query);
    query = query.toLowerCase();
    // let flag = this.filteredData = this.data.filter(item => {
    //   return item.toLowerCase().includes(query);
    // });
    this.filteredData = this.data.filter(item => {
      let flag = false;
      this.columns.map( col => {
        if (item[col.field].toLowerCase().includes(query)) {
          flag = true;
        }
      })
      return flag;
    });
  }
}
