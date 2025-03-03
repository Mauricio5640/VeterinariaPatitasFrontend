import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  private userSubject = new BehaviorSubject<Usuario | null>(null);
  public userUpdate = this.userSubject.asObservable();
  public readonly listUser : Usuario[] = [
    {
      idUsuario: "1",
      nombre: "Mauricio",
      userRole: "USER",
      email: "mau@mail.com",
      password: "123",
    },
    {
      idUsuario: "2",
      nombre: "Orlando",
      userRole: "USER",
      email: "orlando@mail.com",
      password: "123",
    }
  ]


  /**
   * Emite un usuario actualizado a través del subject.
   *
   * @param {Usuario} usuario - El usuario que se desea emitir.
   * @returns {void}
   */
  emitUser(usuario: Usuario): void {
    this.userSubject.next(usuario);
  }

  /**
   * Obtiene el valor actual del usuario.
   *
   * @returns {Usuario | null} El usuario actual o null si no hay ninguno.
   */
  getUserCurrency(): Usuario | null {
    return this.userSubject.getValue();
  }

}
