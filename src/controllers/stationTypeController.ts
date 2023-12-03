import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { StationType } from "../entity";

export class StationTypeController {
    async getStationTypes(req: Request, res: Response): Promise<Response> {
        const stationTypes = await AppDataSource.getRepository(StationType);
        return res.send(stationTypes);
    }
    async getStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(StationType);
        const stationType = await repo.findOneBy({
            id: id
        });
        if(!stationType){
            return res.json({message: "Cant find this station"});
        }
        return res.send(stationType);
    }
    async createStationType(req: Request, res: Response): Promise<Response> {
        const stationTypeBody = req.body;
        const repo = AppDataSource.getRepository(StationType);
        const stationType = repo.create(stationTypeBody);
        await repo.save(stationType);
        return res.send(stationType);
    }
    async updateStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationTypeBody = req.body;
        const repo = AppDataSource.getRepository(StationType);
        const stationType = await repo.findOneBy({
            id: id,
        });
        if(!stationType){
            return res.json("Cant find this station");
        }
        repo.merge(stationType, stationTypeBody);
        await repo.save((stationType));
        return res.send(stationType);
    }
    async deleteStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(StationType);
        const stationType = await repo.findOneBy({
            id: id,
        });
        if(!stationType) {
            return res.json({message: "Cant find this station"});
        }
        await repo.remove(stationType);
        return res.send(res);
    }
}