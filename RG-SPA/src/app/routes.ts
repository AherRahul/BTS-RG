import { Routes } from '@angular/router';
import { ClientComponent } from './component/client/client.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { ReportsComponent } from './component/reports/reports.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { SheduleComponent } from './component/shedule/shedule.component';
import { AuthGuard } from './_services/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'schedule',
        component: SheduleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'resources',
        component: ResourcesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clients',
        component: ClientComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
