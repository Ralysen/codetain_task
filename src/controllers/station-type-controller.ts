import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { StationType } from "../entity";
import { ResponseUtils } from "../middleware/response-utils";

export class StationTypeController {
    async getStationTypes(req: Request, res: Response): Promise<Response> {
        const stationTypes = await AppDataSource.getRepository(StationType);
        return ResponseUtils.sendResponse(res, stationTypes, 200);
    }

    async getStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(StationType);
        const stationType = await repo.findOneBy({
            id: id
        });
        if(!stationType){
            return ResponseUtils.sendError(res, "Station type not found", 404);
        }
        return ResponseUtils.sendResponse(res, stationType, 200);
    }

    async createStationType(req: Request, res: Response): Promise<Response> {
        const stationTypeBody = req.body;
        const repo = AppDataSource.getRepository(StationType);
        const stationType = repo.create(stationTypeBody);
        await repo.save(stationType);
        return ResponseUtils.sendResponse(res, stationType, 200);
    }

    async updateStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationTypeBody = req.body;
        const repo = AppDataSource.getRepository(StationType);
        const stationType = await repo.findOneBy({
            id: id,
        });
        if(!stationType){
            return ResponseUtils.sendError(res, "Station type not found", 404);
        }
        repo.merge(stationType, stationTypeBody);
        await repo.save((stationType));
        return ResponseUtils.sendResponse(res, stationType, 200);
    }

    async deleteStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(StationType);
        const stationType = await repo.findOneBy({
            id: id,
        });
        if(!stationType) {
            return ResponseUtils.sendError(res, "Station type not found", 404);
        }
        await repo.remove(stationType);
        return ResponseUtils.sendResponse(res, stationType, 200);
    }
}