import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinariaRoutingModule } from './veterinaria-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from "../../shared/shared.module";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CitasComponent } from './pages/citas/citas.component';
import { CrearCitaComponent } from './components/crear-cita/crear-cita.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LayoutComponent,
    HomePageComponent,
    CitasComponent,
    CrearCitaComponent
  ],
  imports: [
    CommonModule,
    VeterinariaRoutingModule,
    SharedModule,
    RouterModule
]
})
export class VeterinariaModule { }
