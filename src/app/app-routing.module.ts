import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './home/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  // {path: 'feeder', component: FeederComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
