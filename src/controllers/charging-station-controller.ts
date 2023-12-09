import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import {AppDataSource} from "../database/data-source";
import {ChargingStation} from "../entity";
import QueryCreator from "../middleware/query-creator";
import {validate} from "class-validator";

export class ChargingStationController {
    async getStations(req: Request, res: Response): Promise<Response> {
        const alias = "charging_station"
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const queryBuilder = chargingStationRepo.createQueryBuilder(alias);

        try {
            const stations = await QueryCreator.createQuery(req, queryBuilder, alias);
            return ResponseUtils.sendResponse(res, stations, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't ger stations list", 404, error)
        }

    }

    async getStationById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        let station;

        try {
            station = await chargingStationRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, station, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", 404);
        }

    }

    async createStation(req: Request, res: Response): Promise<Response> {
        const stationBody: ChargingStation = req.body;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const validateErrors = await validate(stationBody);

        if(validateErrors.length > 0) {
            return ResponseUtils.sendError(res, "Bad request", 400);
        }

        try {
            const newStation = chargingStationRepo.create(stationBody);
            await chargingStationRepo.save(newStation);

            return ResponseUtils.sendResponse(res, newStation, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create station", 500);
        }
    }

    async updateStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationBody = req.body;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        let updatedStation;
        let existingStation;

        try {
            try {
                existingStation = await chargingStationRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find station with specified id");
            }

            chargingStationRepo.merge(existingStation, stationBody);
            const validationErrors = await validate(existingStation);

            if(validationErrors.length>0) {
                return ResponseUtils.sendError(res, "Bad request", 400);
            }

            updatedStation = await chargingStationRepo.save(existingStation);
            return ResponseUtils.sendResponse(res, updatedStation, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create station", 500);
        }

    }

    async deleteStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        let stationToRemove;
        try {
            try {
                stationToRemove = await chargingStationRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find station", 404);
            }

            await chargingStationRepo.remove(stationToRemove);

            return ResponseUtils.sendResponse(res, {message: "Station remove successfully"}, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't remove station", 500);
        }
    }
}