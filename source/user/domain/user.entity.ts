// TODO: Intentar mantener desacoplado lo máximo que se pueda de la infraestructura

// * Evitar crear interfaces que entren en comflicto al momento de crear un nuevo repositorio

export interface UserEntity {
    name: string;
    email: string;
    uuid: string;
    description: string;
}