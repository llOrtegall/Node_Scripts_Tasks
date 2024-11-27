import { SUCURSALES_MULTIRED } from './contantes';
import { MetaHora } from './model/ventaHoras';
import { pool } from './connection/mysql';
import { RowDataPacket } from 'mysql2';
import { CronJob } from 'cron';

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
  await MetaHora.sync();
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

async function main() {
  try {
    const data = await getSucursales();
    const sinDatos = SUCURSALES_MULTIRED.filter(s => !data.map(d => d.SUCURSAL).includes(s));

    await syncMetaHora(data, sinDatos);

    console.log('=======================================================================');
    console.log('N° Datos Sync: ', data.length);
    console.log('N° Sucursales Sin Datos: ', sinDatos.length);
    console.log('Total Datos Insertados: ', data.length + sinDatos.length);
    
  } catch (error) {
    console.error(error);
  } finally {
    pool.end();
  }
}

const job = new CronJob(
  '0 6-22 * * *', // cronTime: cada hora desde las 6 AM hasta las 10 PM
  main, // onTick
  null, // onComplete
  true, // start
  'America/Bogota' // timeZone
);

job.start();