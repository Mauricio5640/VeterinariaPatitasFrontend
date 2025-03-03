import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinariaRoutingModule } from './veterinaria-routing.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    VeterinariaRoutingModule
  ]
})
export class VeterinariaModule { }
