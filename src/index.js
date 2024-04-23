import { pool_metas, pool_test } from './connections/dbs.js'


const PRODUCTOS ='CHANCE,PAGAMAS,PAGATODO,GANE5,PATA_MILLONARIA,DOBLECHANCE,CHANCE_MILLONARIO,ASTRO,LOTERIA_FISICA,LOTERIA_VIRTUAL,BETPLAY,GIROS,SOAT,RECAUDOS,RECARGAS,PROMO1,PROMO2'


const selecionando_sucursales_yumbo = async () => {
  try {
    const connection = await pool_metas.getConnection()

    const [rows] = await connection.query(`SELECT ${PRODUCTOS} FROM METASPRODUCTOS where FECHA = CURDATE() and ZONA = "39627"`)
    console.log(rows);
    console.log(rows.length);
    return rows
  } catch (error) {
    console.log(error);
  }
}

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

    // const sucursales = await selecionando_sucursales_yumbo()
    // const logueado = await datos_logueados_yumbo()

    console.log(sucursales.length);
    console.log(logueado.length);

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

  } catch (error) {
    console.log(error);
  }
}


selecionando_sucursales_yumbo()