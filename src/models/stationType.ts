import { DataType } from 'sequelize-typescript';
import sequalize from './sequalize';
import { StationCurrentType } from '../enums'

export const stationType = sequalize.define('Charging station type', {
    id: {
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    plug_count: {
        type: DataType.INTEGER
    },
    efficiency: {
        type: DataType.FLOAT
    },
    current_type: {
        type: DataType.ENUM,
        values: Object.values(StationCurrentType),
        allowNull: false
    }
})