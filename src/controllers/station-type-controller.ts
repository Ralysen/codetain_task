import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import { AppDataSource } from "../database/data-source";
import { StationType } from "../entity";
import QueryCreator from "../middleware/query-creator";
import { validate } from "class-validator";
import { ResponseCodes } from "../support/enums";
import { ResponseMessages } from "../support/objects/responseMessages";

export class StationTypeController {


    async getStationTypes(req: Request, res: Response): Promise<Response> {
        const alias = "station_type";
        const logContext = "station-type-controller.ts -> getStationTypes()";
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        const queryBuilder = stationTypeRepo.createQueryBuilder(alias);

        try {
            const stationTypes = await QueryCreator.createQuery(req, queryBuilder, alias)
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, stationTypes);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't get station types list", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
        }
    }

    async getStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "station-type-controller.ts -> getStationType()";
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        let stationType;

        try {
            stationType = await stationTypeRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, stationType);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station type with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);

        }
    }

    async createStationType(req: Request, res: Response): Promise<Response> {
        const stationTypeBody: StationType = req.body;
        const logContext = "station-type-controller.ts -> createStationType()";
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        const validateErrors = await validate(stationTypeBody);

        if(validateErrors.length>0) {
            return ResponseUtils.sendError(res, "", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
        }

        try {
            const newStationType = stationTypeRepo.create(stationTypeBody);
            await stationTypeRepo.save(newStationType);
            return ResponseUtils.sendResponse(res, "Station Type created successfully", ResponseCodes.CREATED, ResponseMessages[ResponseCodes.CREATED], logContext, newStationType);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create specified station type", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, error);
        }

    }

    async updateStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "station-type-controller.ts -> updateStationType()";
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        const stationTypeBody = req.body;

        try {
            const existingStationType = await stationTypeRepo.findOneByOrFail({ id: id });
            stationTypeRepo.merge(existingStationType, stationTypeBody);
            await stationTypeRepo.save(existingStationType);
            return ResponseUtils.sendResponse(res, "Station Type updated successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, existingStationType);

        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create specified station type", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, error);
        }
    }

    async deleteStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "station-type-controller.ts -> deleteStationType()";
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        let stationTypeToRemove;
        try {
            try {
                stationTypeToRemove = await stationTypeRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find station type with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
            }
            await stationTypeRepo.remove(stationTypeToRemove);
            return ResponseUtils.sendResponse(res, "Station Type removed successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create specified station type", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, error);
        }
    }
}