import { ReportsComponent } from './employer/reports/reports.component';
import { SettingsComponent } from './employer/settings/settings.component';
import { TeamsComponent } from './employer/teams/teams.component';

import { EmployerComponent } from './employer/employer.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';

const routes: Routes = [

  {path:'team',component:EmployerComponent,canActivate:[AuthGuardService]},
  {path:'team/:id',component:TeamsComponent,canActivate:[AuthGuardService]},

  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  // {path:'employee',component:EmployeeComponent,canActivate:[AuthGuardService]},
  //  {path:'/404',component:TeamsComponent},
  { path: '',   redirectTo: '/team', pathMatch: 'full' },
  // {path: '**', redirectTo: '/404'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
