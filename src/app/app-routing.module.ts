import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundPageComponent } from './shared/pages/notfound-page/notfound-page.component';
import { PublicGuard } from './auth/guards/public.guard';
import { AuthGuard } from './auth/guards/ath.guard';

const routes: Routes = [
  // {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then((m)=> m.AuthModule)},
  // {path: 'veterinaria', loadChildren: () => import('./modules/veterinaria/veterinaria.module').then((m) => m.VeterinariaModule)},
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then((m)=> m.AuthModule), canActivate:[PublicGuard], canMatch:[PublicGuard] },
  {path: 'veterinaria', loadChildren: () => import('./modules/veterinaria/veterinaria.module').then((m) => m.VeterinariaModule), canActivate:[AuthGuard], canMatch:[AuthGuard]},
  {path: '404', component: NotfoundPageComponent},
  {path: '', redirectTo: 'veterinaria', pathMatch: 'full'},
  {path: '**', redirectTo: '404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
