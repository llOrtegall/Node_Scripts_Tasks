import { SUCURSALES_MULTIRED } from './contantes';
import { pool } from './connection/mysql';
import { RowDataPacket } from 'mysql2';

const test = [39816, 39825, 54636]

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
    AND SUCURSAL IN (${aplanarString(test)})
    LIMIT 2
    `);

  return sucursales;
};

getSucursales()
  .then(data => {
    const sinDatos = test.filter(el => !data.find(d => d.SUCURSAL === el));
    console.log(sinDatos.length);
    console.log(data);
  })
  .catch(console.error);


  // FECHA TIME SUCURSAL CHANCE PAGAMAS PAGATODO GANE ASTRO