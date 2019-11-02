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
  constructor() { }
  
  @Input() data = [{name:"test", age:20},{name:"test1", age:30}];
  @Output() valueChanged = new EventEmitter();

  private changed:boolean;
  columns= [];

  ngOnInit() {
    this.columns = Object.keys(this.data[0]);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changed = !this.isEqual(changes.data.previousValue, changes.data.currentValue);
    this.valueChanged.emit(this.changed);
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
