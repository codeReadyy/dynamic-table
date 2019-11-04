import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dynamic-dynamic-table',
  template: `
  <cdk-virtual-scroll-viewport [itemSize]="20" class="list">
  <table id="dynamic-table">
      <thead>
      <tr>
          <th *ngFor="let col of columns">{{col}}</th>
      </tr>
      </thead>
      <tbody>
          <tr *cdkVirtualFor="let row of data">
              <td *ngFor="let col of columns">{{row[col]}}</td>
          </tr>
      </tbody>
  </table>
</cdk-virtual-scroll-viewport>
  `,
  styles: [`
  .list{
    height:500px;
  }
  #dynamic-table {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  #dynamic-table td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  #dynamic-table tr:nth-child(even){background-color: #f2f2f2;}
  
  #dynamic-table tr:hover {background-color: #ddd;}
  
  #dynamic-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }
  `],
  encapsulation: ViewEncapsulation.Native
})
export class DynamicTableComponent implements OnInit {
  private _data;
  private _dataChanged:boolean;
  columns = [];

  constructor() { }
  
  @Output() valueChanged = new EventEmitter();

  get data(): [] {
    return this._data;
  }
  
  @Input()
  set data(data: []) {
    this._data = [...data];
  }

  get dataChanged(): boolean {
    return this._dataChanged;
  }

  set dataChanged(dataChanged: boolean){
    this._dataChanged = dataChanged;
  }

  // get columns() {
  //   return this._columns;
  // }

  // set columns(_columns){
  //   this._columns = this.columns;
  // }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    
    this.columns = Object.keys(this._data[0]);
    this.data = this._data;
    console.log(this.data);
    this.dataChanged = !this.isEqual(changes.data.previousValue, changes.data.currentValue);
    console.log(this.dataChanged);
    this.valueChanged.emit(this.dataChanged);
  }

  isEqual(previous, current){ // Checking only for Object and Array not for function type
    //Not covered sequence check for objects, can be done by sorting both the inputs
    if(!previous)
     return true;
    else {
      if(Array.isArray(previous) && Array.isArray(current)){
        if(previous.length !== current.length)
          return false;
        for(let index =0; index < previous.length; index++){
          if(this.compare(previous[index], current[index]) === false)
            return false;
        }
      }
      else{
        if(Object.keys(previous).length !== Object.keys(current).length){
          return false;
        }
        for (let key in current) {
          if (current.hasOwnProperty(key)) {
            if(this.compare(previous[key], current[key])===false)
              return false;
          }
        }
      }
      return true;
    }
  }

  compare(oldItem, newItem){
    let itemType = Object.prototype.toString.call(oldItem);
    // If an object, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!this.isEqual(oldItem, newItem))
       return false;
    }
    else {
      if(Object.prototype.toString.call(oldItem) !== Object.prototype.toString.call(newItem))
        return false;
      else {
        if (oldItem !== newItem) return false;
      }
    } 
  }
}
