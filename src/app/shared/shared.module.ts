import { EmployeeComponent } from './../employee/employee.component';
import { AppRoutingModule } from './../app-routing.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from "../authentication/login/login.component";
import { SignupComponent } from "../authentication/signup/signup.component";
import { EmployerComponent } from '../employer/employer.component';
import { CreateTeamComponent } from '../employer/create-team/create-team.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddteamdialogComponent } from '../employer/addteamdialog/addteamdialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { AddCategoryComponent } from '../employer/add-category/add-category.component';
import { TeamsComponent } from '../employer/teams/teams.component';
import {MatCardModule} from '@angular/material/card';
import { SettingsComponent } from '../employer/settings/settings.component';
import { ReportsComponent } from '../employer/reports/reports.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent,
    EmployeeComponent,
    EmployerComponent,
    CreateTeamComponent,
    AddteamdialogComponent,
    AddCategoryComponent,
    TeamsComponent,
    SettingsComponent,
    ReportsComponent,
  ],
  imports:[
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule

  ],
  exports:[
    LoginComponent,
    SignupComponent,
    EmployeeComponent,
    EmployerComponent,
    CreateTeamComponent,
    AddteamdialogComponent,
    AddCategoryComponent,
    TeamsComponent,
    SettingsComponent,
    ReportsComponent,
  ],

})
export class SharedModule{

}
