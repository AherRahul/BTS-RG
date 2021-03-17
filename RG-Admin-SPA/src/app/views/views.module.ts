import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropDownButtonAllModule } from "@syncfusion/ej2-angular-splitbuttons";
import { TreeViewModule } from "@syncfusion/ej2-angular-navigations";
import { DropDownListAllModule, MultiSelectAllModule } from "@syncfusion/ej2-angular-dropdowns";
import { MaskedTextBoxModule, UploaderAllModule } from "@syncfusion/ej2-angular-inputs";
import { ToolbarAllModule, ContextMenuAllModule } from "@syncfusion/ej2-angular-navigations";
import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from "@syncfusion/ej2-angular-buttons";
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from "@syncfusion/ej2-angular-calendars";
import { NumericTextBoxAllModule, TextBoxAllModule } from "@syncfusion/ej2-angular-inputs";
import { ScheduleAllModule, RecurrenceEditorAllModule } from "@syncfusion/ej2-angular-schedule";
import { RxReactiveDynamicFormsModule } from "@rxweb/reactive-dynamic-forms"
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"


import { SharedModule } from '../shared/shared.module';


import { ScheduleComponent } from './schedule/schedule.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateAllocationComponent } from './create-allocation/create-allocation.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateProductCategoryComponent } from './create-product-category/create-product-category.component';
import { CreateResourceTypeComponent } from './create-resource-type/create-resource-type.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { CreateJobTitleComponent } from './create-job-title/create-job-title.component';


@NgModule({
  declarations: [
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
    BsDropdownModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropDownButtonAllModule,
    TreeViewModule,
    DropDownListAllModule,
    MultiSelectAllModule,
    MaskedTextBoxModule,
    UploaderAllModule,
    ToolbarAllModule,
    ContextMenuAllModule,
    ButtonAllModule, 
    CheckBoxAllModule, 
    SwitchAllModule,
    DatePickerAllModule, 
    TimePickerAllModule, 
    DateTimePickerAllModule,
    NumericTextBoxAllModule, 
    TextBoxAllModule,
    ScheduleAllModule, 
    RecurrenceEditorAllModule,
    RxReactiveDynamicFormsModule,
    RxReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    PageNoteFoundComponent,
    ForgotPasswordComponent,
    AdminComponent,
  ]
})
export class ViewsModule { }
