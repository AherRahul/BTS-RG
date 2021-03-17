import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './views/admin/admin.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { LoginComponent } from './views/login/login.component';
import { PageNoteFoundComponent } from './views/page-note-found/page-note-found.component';
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
