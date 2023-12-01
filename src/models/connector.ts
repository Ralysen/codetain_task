import { DataType } from 'sequelize-typescript';
import sequalize from './sequalize';

export const connector = sequalize.define('Connector', {
    id: {
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    priority: {
        type: DataType.BOOLEAN
    }
})