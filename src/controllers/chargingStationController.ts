import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { ChargingStation } from "../entity";

export class ChargingStationController {
    async getStations(req: Request, res: Response): Promise<Response> {
        const stations = await AppDataSource.getRepository(ChargingStation).find();
        return res.send(stations);
    }

    async getStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if(!station){
            return res.json({message: "Cant find this station"});
        }
        return res.send(station);
    }

    async createStation(req: Request, res: Response): Promise<Response> {
        const stationBody = req.body;
        const repo = AppDataSource.getRepository(ChargingStation);
        const station = repo.create(stationBody);
        await repo.save(station);
        return res.send(station);
    }

    async updateStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationBody = req.body;
        const repo = AppDataSource.getRepository(ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if(!station){
            return res.json("Cant find this station");
        }
        repo.merge(station, stationBody);
        await repo.save((station));
        return res.send(station);
    }

    async deleteStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if(!station) {
            return res.json({message: "Cant find this station"});
        }
        await repo.remove(station);
        return res.send(res);
    }
}