import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutPageComponent } from './layout/layout-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[

  ]
})
export class CoreModule { }
