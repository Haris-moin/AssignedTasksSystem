import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthGuardService } from './authentication/auth-guard.service';
import { SharedModule } from './shared/shared.module';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatAutocompleteModule,


  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
