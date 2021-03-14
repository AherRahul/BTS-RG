import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OuterCardComponent } from './outer-card/outer-card.component';
import { InnerCardComponent } from './inner-card/inner-card.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RxReactiveDynamicFormsModule } from "@rxweb/reactive-dynamic-forms"
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"

@NgModule({
  declarations: [OuterCardComponent, InnerCardComponent, DynamicFormComponent, DynamicTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    RxReactiveDynamicFormsModule,
  ],
  exports: [
    OuterCardComponent,
    InnerCardComponent,
    DynamicFormComponent,
    DynamicTableComponent
  ]
})
export class SharedModule { }
