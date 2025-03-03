export interface  Usuario{
    idUsuario: string,
    nombre: string,
    userRole: "USER" | "ADMIN",
    email: string,
    password: string,
}