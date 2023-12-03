import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";

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

AppDataSource.initialize()
    .then(() => {
        console.log("DB initialized successfully");
    })
    .catch((error) => console.error(error));

app.listen(port, () => {
    console.log(`[server]: Server is running at http:localhost:${port}`);
});