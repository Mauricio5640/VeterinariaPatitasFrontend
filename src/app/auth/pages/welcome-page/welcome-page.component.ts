import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPageComponent } from '../register-page/register-page.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  cards = [
    {
      image: 'https://sutuvet.com/wp-content/uploads/2021/11/BLOG_SUTUVET_CUIDADOS_PRE-OPERATORIOS_POST-OPERATORIOS_CIRUGIA.jpg',
      title: 'Cirugías Especializadas',
      description: 'Contamos con equipamiento de vanguardia para cirugías complejas.'
    },
    {
      image: 'https://www.dondeir.com/wp-content/uploads/2023/06/jornada-de-vacunacion-de-mascotas-gratis-unam-.jpg',
      title: 'Vacunación',
      description: 'Mantén a tus mascotas protegidas con nuestro calendario de vacunas.'
    },
    {
      image: 'https://veterinariahidoc.com.mx/wp-content/uploads/2023/02/Consulta-Img.png',
      title: 'Consultas Generales',
      description: 'Atendemos emergencias y chequeos de rutina para tu tranquilidad.'
    },
    {
      image: 'https://cdn.nubika.es/wp-content/uploads/2023/04/requisitos-abrir-peluqueria-canina.jpg',
      title: 'Estética y Cuidado',
      description: 'Baños medicados y peluquería canina/felina para una mascota radiante.'
    },
    {
      image: 'https://www.doogweb.es/wp-content/uploads/2019/09/Revision-veterinaria.jpg',
      title: 'Guardería',
      description: 'Deja a tus mascotas en un entorno seguro y supervisado cuando viajes.'
    },
  ];

  currentIndex = 0;  
  private intervalId: any

  constructor(
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    if (this.currentIndex === this.cards.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.cards.length - 1;
    } else {
      this.currentIndex--;
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginPageComponent, {
      width: '400px', 
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
  
      console.log('Diálogo de Login cerrado:', result);
    });
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterPageComponent, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo de Registro cerrado:', result);
    });
  }
}
