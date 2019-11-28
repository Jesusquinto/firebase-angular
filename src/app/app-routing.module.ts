import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
ProfileComponent

const routes: Routes = [


{ path: '', redirectTo: 'login', pathMatch: 'full'},  
{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
{ path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
