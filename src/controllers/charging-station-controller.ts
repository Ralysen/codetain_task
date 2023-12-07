import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import ChargingStationService from "../services/charging-station-service";

export class ChargingStationController {
    async getStations(req: Request, res: Response): Promise<Response> {
        const stations = await ChargingStationService.getAllStations(req);

        return ResponseUtils.sendResponse(res, stations, 200);
    }

    async getStationById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const station = await ChargingStationService.getStationById(id);

        if(!station){
            return ResponseUtils.sendError(res, "Station not found", 404);
        }

        return ResponseUtils.sendResponse(res, station, 200);
    }

    async createStation(req: Request, res: Response): Promise<Response> {
        const stationBody = req.body;
        const newStation = await ChargingStationService.createStation(stationBody);

        return ResponseUtils.sendResponse(res, newStation, 200);
    }

    async updateStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationBody = req.body;
        const updatedStation = await ChargingStationService.updateStation(id, stationBody);

        if(!updatedStation){
            return ResponseUtils.sendError(res, "Station not found", 404);
        }

        return ResponseUtils.sendResponse(res, updatedStation, 200);
    }

    async deleteStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationToDelete = await ChargingStationService.deleteStation(id);

        if(!stationToDelete) {
            return ResponseUtils.sendError(res, "Station not found", 404);
        }

        return ResponseUtils.sendResponse(res, {message: "Station remove successfully"}, 200);
    }
}