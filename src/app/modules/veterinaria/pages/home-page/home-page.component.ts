import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy{

  images: string[] = [
    'https://segurossura.com/content/uploads/sites/10/2021/01/seguros-sura-las-mascotas-son-peligrosas-para-la-salud.jpg',
    'https://wakyma.com/wakymavets/blog/wp-content/uploads/2023/05/mejorar-comunicacion-duenos-mascotas-veterinaria.jpg',
    'https://mundovets.com/wp-content/uploads/2022/06/mascotas-favoritas-profesionales-veterinarios.jpg',
    // 'https://c0.klipartz.com/pngpicture/594/118/gratis-png-perro-de-agua-espanol-perro-de-agua-portugues-bulldog-frances-comida-para-gatos-gatos-y-perros.png',
    // 'https://c0.klipartz.com/pngpicture/1014/269/gratis-png-ilustracion-de-gatitos-roedores-y-cachorros-veterinaria-veterinaria-veterinaria-clinica-vxe9txe9rinaire-gatos-y-perros-thumbnail.png'
  ];

  currentIndex = 0;

  private intervalId: any

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  nextSlide() {
    if (this.currentIndex === this.images.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }
  
  prevSlide() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.images.length - 1;
    } else {
      this.currentIndex--;
    }
  }


}
