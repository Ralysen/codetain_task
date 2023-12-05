import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import { ErrorHandler } from "./middleware";
import stationTypeRoute from "./routes/station-type-route";
import connectorRoute from "./routes/connector-route";
import chargingStationRoute from "./routes/charging-station-route";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const corsOption = {
    origin: '*',
    methods: 'GET, POST, DELETE, PUT'
}

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/connectors", ErrorHandler.handleErrors(connectorRoute));
app.use("/stations", ErrorHandler.handleErrors(chargingStationRoute));
app.use("/station-types", ErrorHandler.handleErrors(stationTypeRoute));

app.all("*", (req: Request, res: Response) => {
    return res.status(404).send({
        success: false,
        message: "Invalid route",
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(500).send({
        success: false,
        message: "Internal server error",
    });
});

AppDataSource.initialize()
    .then(() => {
        console.log("DB initialized successfully");
    })
    .catch((error) => console.error(error));

app.listen(port, () => {
    console.log(`[server]: Server is running at http:localhost:${port}`);
});
export default app;