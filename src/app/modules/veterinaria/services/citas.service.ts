import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Citas, CitasRequest } from '../interfaces/citas.interface';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response.interface';
@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private flatSubject = new BehaviorSubject<Boolean>(false);
  private citaSubject = new BehaviorSubject<Citas | null>(null);
  public flatUpdate = this.flatSubject.asObservable();
  public citaUpdate = this.citaSubject.asObservable();
  

  constructor(
    private http: HttpClient,
  ) { }
  private baseUrl = environment.baseUrl;
  private apiCitas = 'api/citas';

   /**
   * Actualiza el estado flat.
   *
   * @param {boolean} flat - Nuevo estado a emitir.
   * @returns {void}
   */
   changeFlatState(flat: boolean): void {
    this.flatSubject.next(flat);
  }

  /**
   * Emite una nueva cita a través del subject.
   *
   * @param {Citas} cita - La cita que se desea emitir.
   * @returns {void}
   */
  emitCita(cita: Citas): void {
    this.citaSubject.next(cita);
  }

  /**
   * Obtiene la cita actual almacenada en el subject.
   *
   * @returns {Citas | null} La cita actual o null si no hay ninguna.
   */
  getCurrentCita(): Citas | null {
    return this.citaSubject.getValue();
  }

  /**
   * Obtiene todas las citas asociadas a un usuario.
   *
   * @param {string} idUser - Identificador del usuario.
   * @returns {Observable<ApiResponse<Citas[]>>} Observable con la respuesta de la API que contiene una lista de citas.
   */
  getAll(idUser: string): Observable<ApiResponse<Citas[]>> {
    const today = new Date();

    // Datos de prueba para simular la respuesta de la API
    const citasPrueba: Citas[] = [
      {
        folioCita: 1,
        nombreCliente: "user1",
        nombreMascota: "mascota1",
        especie: "perro",
        razonCita: "razon de prueba",
        fechaCita: today.toISOString().split('T')[0],
        horaCita: '10:00',
        userId: idUser
      },
      {
        folioCita: 4,
        nombreCliente: "user1",
        nombreMascota: "mascota1",
        especie: "perro",
        razonCita: "razon de prueba",
        fechaCita: today.toISOString().split('T')[0],
        horaCita: '10:00',
        userId: idUser
      },
      {
        folioCita: 3,
        nombreCliente: "user1",
        nombreMascota: "mascota1",
        especie: "perro",
        razonCita: "razon de prueba",
        fechaCita: today.toISOString().split('T')[0],
        horaCita: '10:00',
        userId: idUser
      },
      {
        folioCita: 2,
        nombreCliente: "user1",
        nombreMascota: "mascota1",
        especie: "perro",
        razonCita: "razon de prueba",
        fechaCita: today.toISOString().split('T')[0],
        horaCita: '10:00',
        userId: idUser
      },
    ];
    // return of({ status: 'success', message: 'Ok', data: citasPrueba } as ApiResponse<Citas[]>);
    return this.http.get<ApiResponse<Citas[]>>(`${this.baseUrl}/${this.apiCitas}/${idUser}`);
  }

  
  getById(): void {
   
  }

  /**
   * Crea una nueva cita.
   *
   * @param {CitasRequest} citas - Objeto con la información de la nueva cita.
   * @returns {Observable<ApiResponse<Citas>>} Observable con la respuesta de la API.
   */
  create(citas: CitasRequest): Observable<ApiResponse<Citas>> {
    return this.http.post<ApiResponse<Citas>>(`${this.baseUrl}/${this.apiCitas}`, citas);
  }

  /**
   * Actualiza una cita existente.
   *
   * @param {Citas} cita - Objeto cita a actualizar.
   * @returns {Observable<ApiResponse<Citas>>} Observable con la respuesta de la API.
   */
  update(cita: Citas): Observable<ApiResponse<Citas>> {
    return this.http.put<ApiResponse<Citas>>(`${this.baseUrl}/${this.apiCitas}/${cita.folioCita}`, cita);
  }

  /**
   * Elimina una cita según su identificador.
   *
   * @param {number} folioCita - Identificador de la cita a eliminar.
   * @returns {Observable<void>} Observable que se completa cuando la cita es eliminada.
   */
  delete(folioCita: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.apiCitas}/${folioCita}`);
  }

}
