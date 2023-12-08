import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import StationTypeService from "../services/station-type-service";

export class StationTypeController {
    async getStationTypes(req: Request, res: Response): Promise<Response> {
        const stationTypes = await StationTypeService.getAllStationTypes(req);
        return ResponseUtils.sendResponse(res, stationTypes, 200);
    }

    async getStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationType = await StationTypeService.getStationTypeById(id);

        if(!stationType){
            return ResponseUtils.sendError(res, "Station type not found", 404);
        }

        return ResponseUtils.sendResponse(res, stationType, 200);
    }

    async createStationType(req: Request, res: Response): Promise<Response> {
        const stationTypeBody = req.body;
        const stationType = await StationTypeService.createStationType(stationTypeBody);
        return ResponseUtils.sendResponse(res, stationType, 200);
    }

    async updateStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationTypeBody = req.body;
        const stationType = await StationTypeService.updateStationType(id, stationTypeBody);

        if(!stationType){
            return ResponseUtils.sendError(res, "Station type not found", 404);
        }

        return ResponseUtils.sendResponse(res, stationType, 200);
    }

    async deleteStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const stationTypeToRemove = await StationTypeService.deleteStation(id);

        if(!stationTypeToRemove) {
            return ResponseUtils.sendError(res, "Station type not found", 404);
        }

        return ResponseUtils.sendResponse(res, stationTypeToRemove, 200);
    }
}