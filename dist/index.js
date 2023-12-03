import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "reflect-metadata";
import { DataSource } from "typeorm";
import { ChargingStation, Connector, StationType } from "./entity";
import * as console from "console";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const corsOption = {
    origin: '*',
    methods: 'GET, POST, DELETE, PUT'
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Qwerty1@",
    database: "charger",
    synchronize: true,
    logging: true,
    entities: [Connector, ChargingStation, StationType]
});
const chargingStation = new ChargingStation();
chargingStation.name = "its me malario";
const chargingRepo = AppDataSource.getRepository(ChargingStation);
await chargingRepo.save(chargingStation);
AppDataSource.initialize()
    .then(() => {
    console.log("DB initialized successfully");
})
    .catch((error) => console.error(error));
app.get('/', (req, res) => {
    res.json({ message: "Hello, its me" });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http:localhost:${port}`);
});
//# sourceMappingURL=index.js.map