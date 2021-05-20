import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserDashboardComponent } from './user-side/user-dashboard/user-dashboard.component';
import { UserDashboard1Component } from './user-side/user-dashboard1/user-dashboard1.component';

const routes: Routes = [
  {path:'', component:LoginComponent}, 
  {path:'user/login', component:LoginComponent},
  {path:'user/signup', component:SignupComponent},
  {path:'user/dashboard', component:UserDashboard1Component},
  {path: '**', redirectTo: '/user/dashboard'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
