import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Citas } from '../../interfaces/citas.interface';
import { CitasService } from '../../services/citas.service';
import { CrearCitaComponent } from '../../components/crear-cita/crear-cita.component';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { CitasResponse, CitasResponse1 } from '../../interfaces/citas-response.interface';
import { map } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  private readonly successCitaCreated: string = "Cita agendada correctamente";
  private readonly errorCitaCreated: string = "Hubo un error al agendar la cita";
  private readonly successCitaUpdated: string = "Cita actualizada correctamente";
  private readonly errorCitaUpdated: string = "Error al actualizar esta cita";
  private readonly successCitaDeleted: string = "Cita cancelada correctamente";
  private readonly errorCitaDeleted: string = "Error al cancelar esta cita";
  private readonly errorFindingCita: string = "Error al buscar citas";
  private readonly infoCita: string = "No se realizo ningun cambio";
  private readonly statusSuccess: string = "success";
  private idUsuario: string = "";
  displayedColumns: string[] = ['Folio', 'Dueño', 'Mascota', 'Fecha Cita',  'Hora Cita', 'opciones'];
  dataSource: Citas[] = [];

  constructor(
    private dialog: MatDialog,
    private citasService: CitasService,
    private alertService: SweetalertService,
    private userService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.user?.idUsuario!;
    this.getCitas();
  }

  get user(){
    return this.userService.getUserCurrency()
  }

  getCitas() {
    this.citasService.getAll(this.idUsuario)
    .pipe(
      map((citasResponse: ApiResponse<Citas[]>) => citasResponse.data)
    )
    .subscribe({
      next: (citasResponse: Citas[]) => {
        this.dataSource = citasResponse;
      }, error: () => {
        this.alertService.showErrorAlert(this.errorFindingCita);
      }
    });
  }

  agregarCitaDialog(): void {
    this.citasService.changeFlatState(false);
    const dialogRef = this.dialog.open(CrearCitaComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if(result){
          result.userId = this.idUsuario;
          this.citasService.create(result)
          .pipe(
            map((citasResponse: ApiResponse<Citas>) => citasResponse.data)
          )
          .subscribe((citasResponse: Citas) => {
            this.dataSource = [...this.dataSource, citasResponse];
            this.alertService.showSuccessAlert(this.successCitaCreated);
          })
          return;
        }
        this.alertService.showInfoAlert(this.infoCita);
        return;
    });
  }

  editCita(cita: Citas): void {
    this.citasService.emitCita(cita);
    this.citasService.changeFlatState(true);
    const dialogRef = this.dialog.open(CrearCitaComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const citaToUpdate = Object.assign({}, this.citasService.getCurrentCita(), result);
        this.citasService.update(citaToUpdate)
        .subscribe((citasResponse: ApiResponse<Citas>) => {
          if(citasResponse.status === this.statusSuccess){
            this.getCitas();
            this.alertService.showSuccessAlert(this.successCitaUpdated);
            return;
          }
          this.alertService.showErrorAlert(this.errorCitaUpdated);
        });
        return result;
      }
      this.alertService.showInfoAlert(this.infoCita);
      return null;
    });
  }

  deleteCita(folioCita: number): void {
    // this.dataSource = this.dataSource.filter(item => item.id !== cita.id);
    this.alertService.showConfirmAlert()
      .then((result) => {
        if(result){
          this.citasService.delete(folioCita).subscribe({
            next: () => {
              this.getCitas();
              this.alertService.showSuccessAlert(this.successCitaDeleted);
            }, error: () => {
              this.alertService.showErrorAlert(this.errorCitaDeleted);
            }
          });
          return;
        }
        this.alertService.showInfoAlert("No se realizo la operacion");
      })
  }

}
