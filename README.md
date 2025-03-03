# VeterinariaPatitasFrontend

Este proyecto consiste en una aplicación web para una veterinaria llamada **Patitas**, que permite:
- **Gestionar citas** para mascotas (registro, consulta y actualización).
- **Autenticación** (registro e inicio de sesión).

## Características

- **Registro** e **inicio de sesión** que persisten en el _Local Storage_.
- **Agendado de citas** para mascotas con campos como dueño, mascota, fecha, hora y descripción (se conectan a un backend hecho en springboot).

## Usuarios de Prueba

La aplicación ya cuenta con **dos usuarios embebidos** para que puedas iniciar sesión de inmediato:

1. **Email**: `mau@mail.com`  
   **Contraseña**: `123`

2. **Email**: `orlando@mail.com`  
   **Contraseña**: `123`

Si lo prefieres, puedes **registrar** nuevos usuarios directamente en la aplicación. El registro funciona totalmente y también se almacena en el _Local Storage_.

## Requisitos Previos

- **Node.js** (versión 14 o superior)
- **Angular CLI** (versión 16 o superior)

Asegúrate de contar con estas herramientas instaladas antes de ejecutar el proyecto.

## Cómo Ejecutar

1. **Clonar** este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/VeterinariaPatitasFrontend.git

 2. **Descargar dependencias**: 
 **npm install

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
