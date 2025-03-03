export interface Citas {
    folioCita: number,
    nombreCliente: string,
    nombreMascota: string,
    especie: string,
    razonCita: string,
    fechaCita: string,
    horaCita: string,
    userId: string,
}

export type CitasRequest = Omit<Citas, 'folioCita'>;