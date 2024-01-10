// TODO: Intentar mantener desacoplado el dominio de la infraestructura

export interface UserEntity {
    name: string;
    email: string;
    uuid: string;
    description: string;
}