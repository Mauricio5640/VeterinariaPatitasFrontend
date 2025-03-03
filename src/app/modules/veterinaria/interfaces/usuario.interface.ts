export interface  Usuario{
    idUsuario: number,
    nombre: string,
    userRole: "USER" | "ADMIN",
    email: string,
    password: string,
}