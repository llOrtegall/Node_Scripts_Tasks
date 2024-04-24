import { type RowDataPacket } from 'mysql2'

export interface ProductoPDV extends RowDataPacket {
  SUCURSAL: number;
  CHANCE: number;
  PAGAMAS: number;
  PAGATODO: number;
  GANE5: number;
  PATA_MILLONARIA: number;
  DOBLECHANCE: number;
  CHANCE_MILLONARIO: number;
  ASTRO: number;
  LOTERIA_FISICA: number;
  LOTERIA_VIRTUAL: number;
  BETPLAY: number;
  GIROS: number;
  SOAT: number;
  RECAUDOS: number;
  RECARGAS: number;
  PROMO1: number;
  PROMO2: number;
}

export interface InforSucursal extends RowDataPacket {
  ZONA: number;
  CCOSTO: number;
  CODIGO: number;
  NOMBRE: string;
  DIRECCION: string;
  BARRIO: string;
  LATITUD: string;
  LONGITUD: string;
  TIPO: string;
  DISPOSITIVO: string;
  CATEGORIA: string;
  SUPERVISOR: string;
  ARRENDATARIO: string;
  ESTADO: string;
  FECHASYS: string;
  FECHA_ACCESO: string;
  LOGIN: string;
  VERSION: string;
}