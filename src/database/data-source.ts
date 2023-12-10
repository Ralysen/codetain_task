import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { ChargingStation, Connector, StationType, User } from "../entity";
import * as process from "process";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Qwerty1@",
    database: process.env.DB_NAME || "charger",
    synchronize: true,
    logging: false,
    entities: [Connector, ChargingStation, StationType, User],
    migrations: [/*...*/]
});