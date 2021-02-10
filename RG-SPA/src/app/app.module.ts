import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { LoginComponent } from './component/login/login.component';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { SheduleComponent } from './component/shedule/shedule.component';
import { CommonModule} from '@angular/common';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { CheckBoxAllModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarAllModule, TreeViewModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule, MultiSelectAllModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaskedTextBoxModule, NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ClientComponent } from './component/client/client.component';
import { ReportsComponent } from './component/reports/reports.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      LoginComponent,
      SheduleComponent,
      DashboardComponent,
      ResourcesComponent,
      ProjectsComponent,
      ClientComponent,
      ReportsComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      CommonModule,
      // tslint:disable-next-line: deprecation
      HttpModule,
      ScheduleAllModule,
      RecurrenceEditorAllModule,
      NumericTextBoxAllModule,
      DatePickerAllModule,
      TimePickerAllModule,
      DateTimePickerAllModule,
      CheckBoxAllModule,
      ToolbarAllModule,
      DropDownListAllModule,
      MaskedTextBoxModule,
      MultiSelectAllModule,
      ButtonModule,
      ListViewModule,
      DropDownListModule,
      TreeViewModule,
      TabModule,
      RichTextEditorAllModule,
      HttpClientModule,
      AppRoutingModule,
      // tslint:disable-next-line: deprecation
      JsonpModule
   ],
   providers: [
      AlertifyService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
