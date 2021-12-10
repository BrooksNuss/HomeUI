import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginStartComponent } from './core/login/login-start/login-start.component';
import { LoginComponent } from './core/login/login.component';
import { PasswordResetComponent } from './core/login/password-reset/password-reset.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path: 'auth', component: LoginComponent},
	{path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
	{path: '**', redirectTo: '/home', pathMatch: 'full'},
	// auth sub paths
	{path: 'login', component: LoginStartComponent, outlet: 'auth'},
	{path: 'password-reset', component: PasswordResetComponent, outlet: 'auth'},
	// {path: '', redirectTo: 'login', pathMatch: 'full'},
	// {path: 'feeder', component: FeederComponent, canActivate: [AuthGuard]},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {enableTracing: true})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
