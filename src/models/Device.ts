import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface DeviceAttributes {
  id: number;
  device_id: string;
  url: string;
  client_name?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface DeviceCreationAttributes extends Optional<DeviceAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Device extends Model<DeviceAttributes, DeviceCreationAttributes> implements DeviceAttributes {
  public id!: number;
  public device_id!: string;
  public url!: string;
  public client_name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Device.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'devices',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Device;
