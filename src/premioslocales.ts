import { connectionOracle } from './connection/oracledb';
import { usuariosDoc } from './contanst';
import { RowType } from './interface';


export const funPremiosLocales = async () => {

  let pool = await connectionOracle();

  // Check if the connection was successful
  if (pool instanceof Error) throw pool
  let connection = await pool.getConnection();

  try {
    const { rows } = await connection.execute<RowType[]>(
      `
      SELECT SERIE, NUMERO 
      FROM premiospersonaproveedor 
      WHERE fechapago BETWEEN TO_DATE('01/10/2024','DD/MM/YYYY') AND TO_DATE('31/10/2024','DD/MM/YYYY')
      AND documentocajero IN (${usuariosDoc.join(',')})
      `
    )

    // evaluar  que no sea undefined y sea mayor a 0 las rows 
    if (!rows || rows.length === 0) {
      console.log('No se encontraron registros')
      return
    }

    // unir los valores de la columna SERIE y NUMERO dentro de cada row
    const premios = rows.map(row => row.join(''))

    return premios
  } catch (error) {
    console.error(error)
    throw error
  }
}