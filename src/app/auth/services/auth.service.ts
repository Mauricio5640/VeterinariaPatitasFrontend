import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user?: Usuario;
  constructor(
    private http: HttpClient,
    private userService: UsuarioService
  ) { }

  /**
   * Devuelve una copia del usuario autenticado actualmente.
   * Si no existe, intenta obtenerlo desde localStorage.
   *
   * @readonly
   * @returns {Usuario | undefined} Una copia del usuario o undefined si no hay usuario autenticado.
   */
  get currentUser(): Usuario | undefined {
    if (!this.user) {
      const userString = localStorage.getItem('user');
      if (userString) {
        this.user = JSON.parse(userString);
      }
    }
    return structuredClone(this.user);
  }

  /**
   * Verifica la autenticación comprobando si existe un token en localStorage.
   * 
   * @returns {Observable<boolean>} Observable que emite true si el token existe, false en caso contrario.
   */
  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return of(true);
  }

  /**
   * Intenta autenticar un usuario buscando en la lista de usuarios por email y password.
   * Si el usuario es encontrado, se almacena en localStorage y se devuelve.
   *
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Observable<Usuario | null>} Observable que emite el usuario autenticado o null si no se encuentra.
   */
  login(email: string, password: string): Observable<Usuario | null> {
    const usuario = this.userService.listUser.find(user => user.email === email && user.password === password);
    if (usuario) {
      this.user = usuario;
      localStorage.setItem('token', usuario.idUsuario.toString());
      localStorage.setItem('user', JSON.stringify(usuario));
      return of(usuario);
    }
    return of(null);
  }

  /**
   * Registra un nuevo usuario, lo almacena en localStorage y emite el usuario mediante el servicio UsuarioService.
   *
   * @param {Usuario} user - Objeto usuario a registrar.
   * @returns {Observable<Usuario>} Observable que emite el usuario registrado.
   */
  register(user: Usuario): Observable<Usuario> {
    this.user = user;
    localStorage.setItem('token', user.idUsuario.toString());
    localStorage.setItem('user', JSON.stringify(user));
    this.userService.emitUser(user);
    return of(user);
  }

  /**
   * Cierra la sesión del usuario actual, eliminando los datos almacenados en localStorage.
   *
   * @returns {void}
   */
  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
