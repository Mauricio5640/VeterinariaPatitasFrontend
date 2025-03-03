import { Citas } from "./citas.interface";

export interface CitasResponse {
    status: string,
    message: string,
    data: Citas,
}

export interface CitasResponse1 {
    status: string,
    message: string,
    data: Citas[],
}