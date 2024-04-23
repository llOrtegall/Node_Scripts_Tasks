import { pool_metas, pool_test } from './connections/dbs.js'


const PRODUCTOS ='SUCURSAL,CHANCE,PAGAMAS,PAGATODO,GANE5,PATA_MILLONARIA,DOBLECHANCE,CHANCE_MILLONARIO,ASTRO,LOTERIA_FISICA,LOTERIA_VIRTUAL,BETPLAY,GIROS,SOAT,RECAUDOS,RECARGAS,PROMO1,PROMO2'


const productos_sucursales_yumbo_del_dia_actual = async () => {
  try {
    const connection = await pool_metas.getConnection()

    const [rows] = await connection.query(`SELECT ${PRODUCTOS} FROM METASPRODUCTOS where FECHA = CURDATE() and ZONA = "39627"`)
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

const insert_productos_in_tables_horas = async () => {
  try {
    const connection = await pool_test.getConnection()
    
    const productos_sucursales = await productos_sucursales_yumbo_del_dia_actual()

    for (let i = 0; i < productos_sucursales.length; i++) {
      const sucursal = productos_sucursales[i]
      const sucursal_name = sucursal.SUCURSAL
      const chance = sucursal.CHANCE
      const pagamas = sucursal.PAGAMAS
      const pagatodo = sucursal.PAGATODO
      const gane5 = sucursal.GANE5
      const pata_millonaria = sucursal.PATA_MILLONARIA
      const doblechance = sucursal.DOBLECHANCE
      const chance_millonario = sucursal.CHANCE_MILLONARIO
      const astro = sucursal.ASTRO
      const loteria_fisica = sucursal.LOTERIA_FISICA
      const loteria_virtual = sucursal.LOTERIA_VIRTUAL
      const betplay = sucursal.BETPLAY
      const giros = sucursal.GIROS
      const soat = sucursal.SOAT
      const recaudos = sucursal.RECAUDOS
      const recargas = sucursal.RECARGAS
      const promo1 = sucursal.PROMO1
      const promo2 = sucursal.PROMO2

      await connection.query(
        `
          INSERT INTO horas_${sucursal_name}(
            CHANCE, PAGAMAS, PAGATODO, GANE5, PATA_MILLONARIA, DOBLECHANCE, CHANCE_MILLONARIO, ASTRO, LOTERIA_FISICA, 
            LOTERIA_VIRTUAL, BETPLAY, GIROS, SOAT, RECAUDOS, RECARGAS, PROMO1, PROMO2
          ) VALUES (
            ${chance}, ${pagamas}, ${pagatodo}, ${gane5}, ${pata_millonaria}, ${doblechance}, ${chance_millonario}, ${astro}, 
            ${loteria_fisica}, ${loteria_virtual}, ${betplay}, ${giros}, ${soat}, ${recaudos}, ${recargas}, ${promo1}, ${promo2}
          )
        `
      )
    }
  

  } catch (error) {
    console.log(error);
  }
}
