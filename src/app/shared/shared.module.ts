import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './index-material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NotfoundPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ...MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ...MaterialModule
  ]
})
export class SharedModule { }
