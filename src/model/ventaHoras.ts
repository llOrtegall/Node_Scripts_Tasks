import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import connMysql from '../connection/db_seq_conn'

class MetaHora extends Model<InferAttributes<MetaHora>, InferCreationAttributes<MetaHora>> {
  declare ID?: number;
  declare FECHA?: Date;
  declare HORA?: string;
  declare SUCURSAL: number;
  declare CHANCE: number;
  declare PAGAMAS: number;
  declare PAGATODO: number;
  declare GANE5: number;
  declare ASTRO: number;
}

MetaHora.init({
  ID: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  FECHA: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
  HORA: { type: DataTypes.TIME, allowNull: false, defaultValue: DataTypes.NOW },
  SUCURSAL: { type: DataTypes.INTEGER, allowNull: false },
  CHANCE: { type: DataTypes.INTEGER, allowNull: false },
  PAGAMAS: { type: DataTypes.INTEGER, allowNull: false },
  PAGATODO: { type: DataTypes.INTEGER, allowNull: false },
  GANE5: { type: DataTypes.INTEGER, allowNull: false },
  ASTRO: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize: connMysql,
  tableName: 'VENTA_HORAS',
  timestamps: false,
  indexes: [
    {
      fields: ['FECHA']
    },
    {
      fields: ['SUCURSAL']
    }
  ]

},)

export { MetaHora }