import { Sequelize } from 'sequelize'

const connection = new Sequelize('testData', 'root', 'root', {
  host: '172.20.1.70',
  dialect: 'mysql',
  port: 9010,
  timezone: '-05:00',
  logging: false
})

export default connection