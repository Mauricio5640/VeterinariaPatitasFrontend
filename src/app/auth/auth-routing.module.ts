import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayaoutPageComponent } from './pages/layaout-page/layaout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
  {
      path: '',
      component: LayaoutPageComponent,
      children: [
          { path: 'welcome', component: WelcomePageComponent },
          // {path:'login', component: LoginPageComponent},
          // {path:'new-account', component: RegisterPageComponent},
          {path:'**', redirectTo: 'welcome'},
      ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
