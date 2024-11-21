import { connectionOracle } from './connection/oracledb';
import { usuariosDoc } from './contanst';
import { RowType2 } from './interface';


export const funPremiosExternos = async () => {
  try {
    let pool = await connectionOracle();

    // Check if the connection was successful
    if (pool instanceof Error) throw pool
    let connection = await pool.getConnection();


    const { rows } = await connection.execute<RowType2[]>(
      `
      SELECT FECHAPAGO, SERIE, NUMERO, TOTALPREMIO, RETEFUENTE, LOGINCAJERO, PUNTO_VTA_PAGO, HORA 
      FROM premiospersonaproveedor@CONSULTAS
      WHERE 
        fechapago BETWEEN TO_DATE('01/10/2024','DD/MM/YYYY') AND TO_DATE('31/10/2024','DD/MM/YYYY')
      AND documentocajero IN (${usuariosDoc.join(',')})
    `
    );

    // evaluar  que no sea undefined y sea mayor a 0 las rows 
    if (!rows || rows.length === 0) {
      console.log('No se encontraron registros')
      return
    }

    // unir solo la 2da y 3ra columna de cada row
    const premios = rows.map(row => row.slice(1, 3).join(''))

    return premios
  } catch (error) {
    console.error(error)
    throw error
  }
}