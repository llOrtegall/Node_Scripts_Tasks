import { SUCURSALES_MULTIRED } from './contantes';
import { MetaHora } from './model/ventaHoras';
import { pool } from './connection/mysql';
import { RowDataPacket } from 'mysql2';

interface QueryResult extends RowDataPacket {
  SUCURSAL: number;
  CHANCE: number;
  PAGAMAS: number;
  PAGATODO: number;
  GANE5: number;
  ASTRO: number;
}

const aplanarString = (arr: number[]) => arr.map((el) => `'${el}'`).join(',');

const getSucursales = async () => {
  const [sucursales] = await pool.execute<QueryResult[]>(`
    SELECT SUCURSAL, CHANCE, PAGAMAS, PAGATODO, GANE5, ASTRO 
    FROM METASPRODUCTOS 
    WHERE FECHA = CURDATE()
    AND ZONA = 39627
    AND SUCURSAL IN (${aplanarString(SUCURSALES_MULTIRED)})
    `);

  return sucursales;
};

async function syncMetaHora(data: any[], sinDatos: any[]) {
  const allData = [
    ...data.map(d => ({
      SUCURSAL: d.SUCURSAL,
      CHANCE: d.CHANCE,
      PAGAMAS: d.PAGAMAS,
      PAGATODO: d.PAGATODO,
      GANE5: d.GANE5,
      ASTRO: d.ASTRO
    })),
    ...sinDatos.map(d => ({
      SUCURSAL: d,
      CHANCE: 0,
      PAGAMAS: 0,
      PAGATODO: 0,
      GANE5: 0,
      ASTRO: 0
    }))
  ];

  await MetaHora.bulkCreate(allData);
}

getSucursales()
  .then(async (data) => {
    const sinDatos = SUCURSALES_MULTIRED.filter(el => !data.find(d => d.SUCURSAL === el));

    await MetaHora.sync();
    await syncMetaHora(data, sinDatos);
    
    console.log('=========================================================');
    console.log('Datos en 0: ', sinDatos.length);
    console.log('Datos sincronizados: ', data.length);
    console.log('Datos totales insertados: ', data.length + sinDatos.length);
    console.log('Hora Inserción: ', new Date().toLocaleTimeString());
  })
  .catch(console.error);

