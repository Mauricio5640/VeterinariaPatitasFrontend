import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor(

  ) { }


  /**
   * Muestra una alerta de éxito con el mensaje proporcionado.
   *
   * @param {string} successMessage - El mensaje de éxito a mostrar.
   * @returns {void}
   */
  showSuccessAlert(successMessage: string): void {
    Swal.fire({
      title: 'Success',
      text: successMessage,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    });
  }

  /**
   * Muestra una alerta de error con el mensaje proporcionado.
   *
   * @param {string} errorMessage - El mensaje de error a mostrar.
   * @returns {void}
   */
  showErrorAlert(errorMessage: string): void {
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

  /**
   * Muestra una alerta informativa con el mensaje proporcionado.
   *
   * @param {string} infoMessage - El mensaje informativo a mostrar.
   * @returns {void}
   */
  showInfoAlert(infoMessage: string): void {
    Swal.fire({
      title: 'Info',
      text: infoMessage,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  }

  /**
   * Muestra una alerta de confirmación y retorna un Promise que se resuelve
   * en true si el usuario confirma la acción, o false en caso contrario.
   *
   * @returns {Promise<boolean>} Promesa que indica si la acción fue confirmada.
   */
  showConfirmAlert(): Promise<boolean> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => result.isConfirmed);
  }

}
