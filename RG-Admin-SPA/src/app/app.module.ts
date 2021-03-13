import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import {  JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DropDownButtonAllModule } from "@syncfusion/ej2-angular-splitbuttons";
import { HttpClientModule } from '@angular/common/http';// RECOMMENDED
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from './shared/shared.module';

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
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { ProjectService } from './_services/project.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_services/token-interceptor';
import { appRoutes } from './routes';
import { AdminComponent } from './components/admin/admin.component';
import { PageNoteFoundComponent } from './components/page-note-found/page-note-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateAllocationComponent } from './components/create-allocation/create-allocation.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { CreateProductCategoryComponent } from './components/create-product-category/create-product-category.component';
import { CreateResourceTypeComponent } from './components/create-resource-type/create-resource-type.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { CreateJobTitleComponent } from './components/create-job-title/create-job-title.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    SideNavComponent,
    TopNavComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    PageNoteFoundComponent,
    ForgotPasswordComponent,
    CreateUserComponent,
    CreateAllocationComponent,
    CreateClientComponent,
    CreateProjectComponent,
    CreateProductCategoryComponent,
    CreateResourceTypeComponent,
    CreateDepartmentComponent,
    CreateJobTitleComponent
  ],
  imports: [
    SharedModule,
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
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    AlertifyService,
    AuthService,
    ProjectService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
