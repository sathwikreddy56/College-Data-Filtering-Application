import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import{MatCardModule} from '@angular/material/card';
import{MatTabsModule} from '@angular/material/tabs';
import{MatFormFieldModule,} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import{ MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox'
import{ MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSideComponent } from './user-side/user-side.component';
import { UserDashboardComponent } from './user-side/user-dashboard/user-dashboard.component';
import { UserDashboard1Component } from './user-side/user-dashboard1/user-dashboard1.component';
import { UserNavbarComponent } from './user-side/user-navbar/user-navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    UserSideComponent,
    UserDashboardComponent,
    UserNavbarComponent,
    UserDashboard1Component,
    LoginComponent,
    SignupComponent,
    
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    MatSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
