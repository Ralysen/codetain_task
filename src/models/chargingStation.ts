import { DataType } from 'sequelize-typescript';
import sequalize from './sequalize';

export const chargingStation = sequalize.define('Charging Station', {
    id: {
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    device_id: {
        type: DataType.UUID,
        allowNull: false
    },
    ip_address: {
        type: DataType.INTEGER,
        allowNull: false
    },
    firmware_version: {
      type: DataType.STRING,
      allowNull: false
    }
});