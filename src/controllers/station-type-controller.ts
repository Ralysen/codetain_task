import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import { AppDataSource } from "../database/data-source";
import { StationType } from "../entity";
import QueryCreator from "../middleware/query-creator";
import {validate} from "class-validator";

export class StationTypeController {
    async getStationTypes(req: Request, res: Response): Promise<Response> {
        const alias = "station_type";
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        const queryBuilder = stationTypeRepo.createQueryBuilder(alias);

        try {
            const stationTypes = await QueryCreator.createQuery(req, queryBuilder, alias)
            return ResponseUtils.sendResponse(res, stationTypes, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't get station types list", 500);
        }
    }

    async getStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        let stationType;

        try {
            stationType = await stationTypeRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, stationType, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find specified station type", 404);
        }
    }

    async createStationType(req: Request, res: Response): Promise<Response> {
        const stationTypeBody: StationType = req.body;
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        const validateErrors = await validate(stationTypeBody);

        if(validateErrors.length>0) {
            return ResponseUtils.sendError(res, "Bad request", 400);
        }

        try {
            const newStationType = stationTypeRepo.create(stationTypeBody);
            await stationTypeRepo.save(newStationType);
            return ResponseUtils.sendResponse(res, newStationType, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create specified station type", 404);
        }

    }

    async updateStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationTypeBody = req.body;
        const stationTypeRepo = AppDataSource.getRepository(StationType);

        try {
            const existingStationType = await stationTypeRepo.findOneByOrFail({ id: id });
            stationTypeRepo.merge(existingStationType, stationTypeBody);
            await stationTypeRepo.save(existingStationType);
            return ResponseUtils.sendResponse(res, existingStationType, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't update specified station type", 404);
        }
    }

    async deleteStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        let stationTypeToRemove;
        try {
            try {
                stationTypeToRemove = await stationTypeRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find specified station type", 404);
            }
            await stationTypeRepo.remove(stationTypeToRemove);
            return ResponseUtils.sendResponse(res, stationTypeToRemove, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't remove station type", 500);
        }
    }
}