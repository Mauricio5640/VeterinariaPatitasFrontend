import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Citas } from '../../interfaces/citas.interface';
import { CitasService } from '../../services/citas.service';
import { Subject, takeUntil } from 'rxjs';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.scss']
})
export class CrearCitaComponent implements OnInit, OnDestroy {
  private readonly crearCita = "Crear Cita"
  private readonly actualziarCita = "Actualziar Cita"


  private destroy = new Subject<void>
  public citaForm: FormGroup;
  public title: string = '';
  public minDate: Date = new Date();

  minTime: DateTime = DateTime.fromObject({ hour: 9, minute: 0 });
  maxTime: DateTime = DateTime.fromObject({ hour: 18, minute: 0 });


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearCitaComponent>,
    private citasService: CitasService
  ) {
    this.citaForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      nombreMascota: ['', Validators.required],
      especie: ['', Validators.required],
      razonCita: ['', Validators.required],
      fechaCita: ['', Validators.required],
      horaCita: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.citasService.flatUpdate
      .pipe(takeUntil(this.destroy))
      .subscribe(updateFlatResult => {
        if (updateFlatResult) {
          this.updateCita()
        } else {
          this.createCita()
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  get getCita(): Citas {
    let cita: Citas = {
      folioCita: 0,
      nombreCliente: '',
      nombreMascota: '',
      especie: '',
      razonCita: '',
      fechaCita: '',
      horaCita: '',
      userId: '',
    };
    this.citasService.citaUpdate.subscribe((citaToUpdate) => {
      return cita = citaToUpdate!;

    });
    return cita;
  }

  createCita() {
    this.title = this.crearCita
  }

  updateCita() {
    this.title = this.actualziarCita;
    this.fillForm(this.getCita);

  }


  onSubmit(): void {
    if (this.citaForm.valid) {
      const formValue = this.citaForm.value;
      const fechaCitaFormatted =
        formValue.fechaCita instanceof Date
          ? DateTime.fromJSDate(formValue.fechaCita).toFormat('yyyy-MM-dd')
          : formValue.fechaCita;

      const newCita: Citas = {
        ...this.citaForm.value,
        fechaCita: fechaCitaFormatted,
      };
      this.dialogRef.close(newCita);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  fillForm(cita: Citas) {

    this.citaForm = this.fb.group({
      nombreCliente: [cita.nombreCliente, Validators.required],
      nombreMascota: [cita.nombreMascota, Validators.required],
      especie: [cita.especie, Validators.required],
      razonCita: [cita.razonCita, Validators.required],
      fechaCita: [cita.fechaCita, Validators.required],
      horaCita: [cita.horaCita, Validators.required],
    });

  }

}
