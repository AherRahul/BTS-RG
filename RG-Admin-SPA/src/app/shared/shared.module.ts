import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OuterCardComponent } from './outer-card/outer-card.component';
import { InnerCardComponent } from './inner-card/inner-card.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';



@NgModule({
  declarations: [OuterCardComponent, InnerCardComponent, DynamicFormComponent, DynamicTableComponent],
  imports: [
    CommonModule
  ],
  exports: [
    OuterCardComponent,
    InnerCardComponent,
    DynamicFormComponent,
    DynamicTableComponent
  ]
})
export class SharedModule { }
