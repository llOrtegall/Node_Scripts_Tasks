import { type ProductoPDV, InforSucursal } from './types/Products'
import { SelectQuery, ModifyQuery } from './database/queries'
import { pool_metas, pool_test } from './connections/dbs'

const CREATE_TABLES = "FECHA TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL PRIMARY KEY, CHANCE INT, PAGAMAS INT, PAGATODO INT, GANE5 INT, PATA_MILLONARIA INT,DOBLECHANCE INT, CHANCE_MILLONARIO INT, ASTRO INT, LOTERIA_FISICA INT,LOTERIA_VIRTUAL INT, BETPLAY INT, GIROS INT, SOAT INT, RECAUDOS INT,RECARGAS INT, PROMO1 INT, PROMO2 INT"
const PRODUCTOS = 'SUCURSAL,CHANCE,PAGAMAS,PAGATODO,GANE5,PATA_MILLONARIA,DOBLECHANCE,CHANCE_MILLONARIO,ASTRO,LOTERIA_FISICA,LOTERIA_VIRTUAL,BETPLAY,GIROS,SOAT,RECAUDOS,RECARGAS,PROMO1,PROMO2'
const TODAY = new Date().toISOString().slice(0, 10)
const ZONAYUMBO = "39627"


const Info_Sucursales = async () => {
  try {
    const info_sucursales = await SelectQuery<InforSucursal>(pool_metas, `SELECT * FROM INFORMACION_PUNTOSVENTA WHERE ZONA = ?`, [ZONAYUMBO])
    return info_sucursales
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const Sucursales_Productos = async () => {
  try {
    const sucursales = await SelectQuery<ProductoPDV>(pool_metas, `SELECT ${PRODUCTOS} FROM METASPRODUCTOS WHERE FECHA = ? AND ZONA = ?`, [TODAY, ZONAYUMBO])
    return sucursales
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const Crear_Tablas_Horas = async () => {
  try {
    const sucursales = await Info_Sucursales()
    sucursales.map(sucursal => {
      ModifyQuery(pool_test, `CREATE TABLE IF NOT EXISTS horas${sucursal.CODIGO} (${CREATE_TABLES});`)
    })
    console.log('Tables created');
  } catch (error) {
    console.log(error);
  }
}

// TODO: Crear_Tablas_Horas()

const Insert_Data_Venta = async () => {
  try {
    const sucursales = await Sucursales_Productos()    
    const exist_tables = await SelectQuery(pool_metas, `SELECT SUCURSAL from METASPRODUCTOS where FECHA = ? and ZONA = ?`, [TODAY, ZONAYUMBO])
    // TODO: PARA CREAR TABLA QUE NO EXISTA ModifyQuery(pool_test, `CREATE TABLE IF NOT EXISTS horas45532 (${CREATE_TABLES});`)
    
    /* sucursales.map(suc => {
      ModifyQuery(pool_test, `INSERT INTO horas${suc.SUCURSAL} (
        CHANCE,PAGAMAS,PAGATODO,GANE5,PATA_MILLONARIA,DOBLECHANCE,CHANCE_MILLONARIO,ASTRO,LOTERIA_FISICA,LOTERIA_VIRTUAL,BETPLAY,GIROS,SOAT,RECAUDOS,RECARGAS,PROMO1,PROMO2
      ) VALUES (
        ${suc.CHANCE},${suc.PAGAMAS},${suc.PAGATODO},${suc.GANE5},${suc.PATA_MILLONARIA},${suc.DOBLECHANCE},
        ${suc.CHANCE_MILLONARIO},${suc.ASTRO},${suc.LOTERIA_FISICA},${suc.LOTERIA_VIRTUAL},${suc.BETPLAY},
        ${suc.GIROS},${suc.SOAT},${suc.RECAUDOS},${suc.RECARGAS},${suc.PROMO1},${suc.PROMO2}
      )`
      )
    })
    */
    console.log('Data inserted');
  } catch (error) {
    console.log(error);
  }

}

Insert_Data_Venta()


// schedule('*/20 * * * *', async () => {
//   await insert_productos_in_tables_horas()
//   console.log('Inserted data in tables horas');
// })
