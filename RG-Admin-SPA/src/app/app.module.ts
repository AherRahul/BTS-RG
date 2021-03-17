import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';// RECOMMENDED
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

import { ViewsModule } from './views/views.module';

import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_services/token-interceptor';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { ProjectService } from './_services/project.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ViewsModule,
    CommonModule,
    HttpModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
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
