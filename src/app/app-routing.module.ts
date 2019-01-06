import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeModule } from './components/welcome/welcome.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { LoginModule } from './components/login/login.module';
import { LoginGaurdService, LogoutGaurdService } from './auth-gaurds.service';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', canActivate:[LogoutGaurdService], component: LoginComponent },
  { path: 'dashboard', canActivate: [LoginGaurdService], component: DashboardComponent },
];

@NgModule({
  imports: [DashboardModule, LoginModule, WelcomeModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
