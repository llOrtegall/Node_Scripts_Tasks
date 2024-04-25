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
      ModifyQuery(pool_test, `CREATE TABLE IF NOT EXISTS horas'${sucursal.CODIGO} (${CREATE_TABLES});`)
    })
    console.log('Tables created');
  } catch (error) {
    console.log(error);
  }
}

interface Tables {
  Tables_in_sucursales: string
}

const Insert_Data_Venta = async () => {
  try {
    const sucursales = await Sucursales_Productos()
    const tables_created = await SelectQuery<Tables>(pool_test, `SHOW TABLES;`, [])

    const tables = tables_created.map(table => table.Tables_in_sucursales)

    sucursales.map(sucursal => {
      if (tables.includes(`horas${sucursal.SUCURSAL}`)) {
        ModifyQuery(pool_test,
          `INSERT INTO horas${sucursal.SUCURSAL} (
          CHANCE,PAGAMAS,PAGATODO,GANE5,PATA_MILLONARIA,DOBLECHANCE,CHANCE_MILLONARIO,ASTRO,LOTERIA_FISICA,LOTERIA_VIRTUAL,BETPLAY,GIROS,SOAT,RECAUDOS,RECARGAS,PROMO1,PROMO2
        ) VALUES 
        (
          '${sucursal.CHANCE}', '${sucursal.PAGAMAS}', '${sucursal.PAGATODO}', '${sucursal.GANE5}', '${sucursal.PATA_MILLONARIA}', '${sucursal.DOBLECHANCE}', 
          '${sucursal.CHANCE_MILLONARIO}', '${sucursal.ASTRO}', '${sucursal.LOTERIA_FISICA}', '${sucursal.LOTERIA_VIRTUAL}', '${sucursal.BETPLAY}', 
          '${sucursal.GIROS}', '${sucursal.SOAT}', '${sucursal.RECAUDOS}', '${sucursal.RECARGAS}', '${sucursal.PROMO1}', '${sucursal.PROMO2}'
        )
        ;`)
      } else {
        ModifyQuery(pool_test,
          `INSERT INTO horas${sucursal.SUCURSAL} (
          CHANCE,PAGAMAS,PAGATODO,GANE5,PATA_MILLONARIA,DOBLECHANCE,CHANCE_MILLONARIO,ASTRO,LOTERIA_FISICA,LOTERIA_VIRTUAL,BETPLAY,GIROS,SOAT,RECAUDOS,RECARGAS,PROMO1,PROMO2
        ) VALUES ( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );`)
      }
    })

    const hora = new Date().toLocaleTimeString()

    console.log('Datos Insertados En tabla hora: ' + hora);
    

  } catch (error) {
    console.log(error);
  }

}

Insert_Data_Venta()


// schedule('*/20 * * * *', async () => {
//   await insert_productos_in_tables_horas()
//   console.log('Inserted data in tables horas');
// })
