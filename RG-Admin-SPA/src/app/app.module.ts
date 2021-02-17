import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownButtonAllModule } from "@syncfusion/ej2-angular-splitbuttons";

import { TreeViewModule } from "@syncfusion/ej2-angular-navigations";

import { DropDownListAllModule, MultiSelectAllModule } from "@syncfusion/ej2-angular-dropdowns";

import { MaskedTextBoxModule, UploaderAllModule } from "@syncfusion/ej2-angular-inputs";

import { ToolbarAllModule, ContextMenuAllModule } from "@syncfusion/ej2-angular-navigations";

import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from "@syncfusion/ej2-angular-buttons";

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from "@syncfusion/ej2-angular-calendars";

import { NumericTextBoxAllModule, TextBoxAllModule } from "@syncfusion/ej2-angular-inputs";

import { ScheduleAllModule, RecurrenceEditorAllModule } from "@syncfusion/ej2-angular-schedule";

import { HttpModule } from "@angular/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterModule } from "@angular/router";

import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    ScheduleAllModule,
    RecurrenceEditorAllModule,
    NumericTextBoxAllModule,
    TextBoxAllModule,
    DatePickerAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    CheckBoxAllModule,
    ToolbarAllModule,
    DropDownListAllModule,
    ContextMenuAllModule,
    MaskedTextBoxModule,
    UploaderAllModule,
    MultiSelectAllModule,
    TreeViewModule,
    ButtonAllModule,
    DropDownButtonAllModule,
    SwitchAllModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
