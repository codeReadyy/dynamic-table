import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule
  ],
  providers: [],
  entryComponents: [DynamicTableComponent]
})
export class AppModule {
  constructor(injector: Injector){
    const tableRenderer = createCustomElement(DynamicTableComponent, {injector});
    customElements.define("dynamic-table", tableRenderer);
  }

  ngDoBootstrap(){}
 }
