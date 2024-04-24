import { log } from 'console'
import { pool_metas, pool_test } from './connections/dbs'
//  import { schedule } from 'node-cron'


const PRODUCTOS ='SUCURSAL,CHANCE,PAGAMAS,PAGATODO,GANE5,PATA_MILLONARIA,DOBLECHANCE,CHANCE_MILLONARIO,ASTRO,LOTERIA_FISICA,LOTERIA_VIRTUAL,BETPLAY,GIROS,SOAT,RECAUDOS,RECARGAS,PROMO1,PROMO2'

const TODAY = new Date().toISOString().slice(0, 10)

const productos_sucursales_yumbo_del_dia_actual = async () => {
  try {
    const connection = await pool_metas.getConnection()

    const [rows] = await connection.execute(
      `SELECT ${PRODUCTOS} FROM METASPRODUCTOS WHERE FECHA = ? AND ZONA = ?`,
      [TODAY, "39627"]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
}

productos_sucursales_yumbo_del_dia_actual()
  .then((productos) => {
    // console.log(productos);
  })

/* 

const datos_logueados_yumbo = async () => {
  try {
    const connection = await pool_metas.getConnection()

    const [rows] = await connection.query("SELECT * FROM METASPRODUCTOS where FECHA = CURDATE() and ZONA = '39627'")
    return rows
  } catch (error) {
    console.log(error);
  }
}

const create_tables_test = async () => {
  try {
    const connection = await pool_test.getConnection()
    const connection_metas = await pool_metas.getConnection()

    const [sucursales] = await connection_metas.query("SELECT CODIGO FROM INFORMACION_PUNTOSVENTA where ZONA = '39627'")

  
    for (let i = 0; i < sucursales.length; i++) {
      await connection.query(
        `
           CREATE TABLE IF NOT EXISTS horas_${sucursales[i].CODIGO}
           (
            FECHA TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL PRIMARY KEY,
             CHANCE INT, PAGAMAS INT, PAGATODO INT, GANE5 INT, PATA_MILLONARIA INT, DOBLECHANCE INT,
             CHANCE_MILLONARIO INT, ASTRO INT, LOTERIA_FISICA INT, LOTERIA_VIRTUAL INT, BETPLAY INT,
             GIROS INT, SOAT INT, RECAUDOS INT, RECARGAS INT, PROMO1 INT, PROMO2 INT
           );
        `
      )
    }


    console.log('Tables created');

  } catch (error) {
    console.log(error);
  }
}

const insert_productos_in_tables_horas = async () => {
  try {
    const connection = await pool_test.getConnection()
    const productos_sucursales = await productos_sucursales_yumbo_del_dia_actual()

    console.log(productos_sucursales);

    // for (let producto of productos_sucursales) {
    //   const {
    //     SUCURSAL: sucursal_name,
    //     CHANCE: chance,
    //     PAGAMAS: pagamas,
    //     PAGATODO: pagatodo,
    //     GANE5: gane5,
    //     PATA_MILLONARIA: pata_millonaria,
    //     DOBLECHANCE: doblechance,
    //     CHANCE_MILLONARIO: chance_millonario,
    //     ASTRO: astro,
    //     LOTERIA_FISICA: loteria_fisica,
    //     LOTERIA_VIRTUAL: loteria_virtual,
    //     BETPLAY: betplay,
    //     GIROS: giros,
    //     SOAT: soat,
    //     RECAUDOS: recaudos,
    //     RECARGAS: recargas,
    //     PROMO1: promo1,
    //     PROMO2: promo2
    //   } = producto;

    //   const [tables] = await connection.query(`SHOW TABLES LIKE 'horas_${sucursal_name}'`);

    //   if (tables.length === 0) {
    //     console.log(`Table 'horas_${sucursal_name}' does not exist. Skipping insert.`);
    //     continue;
    //   }

    //   await connection.query(
    //     `
    //       INSERT INTO horas_${sucursal_name}(
    //         CHANCE, PAGAMAS, PAGATODO, GANE5, PATA_MILLONARIA, DOBLECHANCE, CHANCE_MILLONARIO, ASTRO, LOTERIA_FISICA, 
    //         LOTERIA_VIRTUAL, BETPLAY, GIROS, SOAT, RECAUDOS, RECARGAS, PROMO1, PROMO2
    //       ) VALUES (
    //         ${chance}, ${pagamas}, ${pagatodo}, ${gane5}, ${pata_millonaria}, ${doblechance}, ${chance_millonario}, ${astro}, 
    //         ${loteria_fisica}, ${loteria_virtual}, ${betplay}, ${giros}, ${soat}, ${recaudos}, ${recargas}, ${promo1}, ${promo2}
    //       )
    //     `
    //   )
    // }


  } catch (error) {
    console.log(error);
  }
}

*/
// insert_productos_in_tables_horas()

// schedule('*/20 * * * *', async () => {
//   await insert_productos_in_tables_horas()
//   console.log('Inserted data in tables horas');
// }) 