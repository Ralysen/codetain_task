import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { ChargingStation } from "../entity";
import { ResponseUtils } from "../middleware/response-utils";

export class ChargingStationController {
    async getStations(req: Request, res: Response): Promise<Response> {
        const stations = await AppDataSource.getRepository(ChargingStation).find();
        return ResponseUtils.sendResponse(res, stations, 200);
    }

    async getStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if(!station){
            return ResponseUtils.sendError(res, "Station not found", 404);
        }
        return ResponseUtils.sendResponse(res, station, 200);
    }

    async createStation(req: Request, res: Response): Promise<Response> {
        const stationBody = req.body;
        const repo = AppDataSource.getRepository(ChargingStation);
        const station = repo.create(stationBody);
        await repo.save(station);
        return ResponseUtils.sendResponse(res, station, 200);
    }

    async updateStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationBody = req.body;
        const repo = AppDataSource.getRepository(ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if(!station){
            return ResponseUtils.sendError(res, "Station not found", 404);
        }
        repo.merge(station, stationBody);
        await repo.save((station));
        return ResponseUtils.sendResponse(res, station, 200);
    }

    async deleteStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if(!station) {
            return ResponseUtils.sendError(res, "Station not found", 404);
        }
        await repo.remove(station);
        return ResponseUtils.sendResponse(res, null);
    }
}