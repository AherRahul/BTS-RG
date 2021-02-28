import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { PageNoteFoundComponent } from './components/page-note-found/page-note-found.component';
import { AuthGuard } from './_services/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'pageNotFound',
        component: PageNoteFoundComponent
    },
    {
        path: '**',
        redirectTo: '/pageNotFound',
        pathMatch: 'full'
    }
];
