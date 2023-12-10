import {Request, Response} from "express";
import {ResponseUtils} from "../middleware";
import {AppDataSource} from "../database/data-source";
import {StationType} from "../entity";
import QueryCreator from "../middleware/query-creator";
import {validate} from "class-validator";
import {ResponseCodes} from "../support/enums";
import {ResponseMessages} from "../support/objects/responseMessages";

export class StationTypeController {
    private stationTypeRepo = AppDataSource.getRepository(StationType);

    async getStationTypes(req: Request, res: Response): Promise<Response> {
        const alias = "station_type";
        const logContext = "station-type-controller.ts -> getStationTypes()";
        const queryBuilder = this.stationTypeRepo.createQueryBuilder(alias);

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
        let stationType;

        try {
            stationType = await this.stationTypeRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, stationType);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station type with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);

        }
    }

    async createStationType(req: Request, res: Response): Promise<Response> {
        const stationTypeBody: StationType = req.body;
        const logContext = "station-type-controller.ts -> createStationType()";
        const validateErrors = await validate(stationTypeBody);

        if(validateErrors.length>0) {
            return ResponseUtils.sendError(res, "", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
        }

        try {
            const newStationType = this.stationTypeRepo.create(stationTypeBody);
            await this.stationTypeRepo.save(newStationType);
            return ResponseUtils.sendResponse(res, "Station Type created successfully", ResponseCodes.CREATED, ResponseMessages[ResponseCodes.CREATED], logContext, newStationType);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create specified station type", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, {error: error});
        }

    }

    async updateStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "station-type-controller.ts -> updateStationType()";
        const stationTypeBody = req.body;

        try {
            const existingStationType = await this.stationTypeRepo.findOneByOrFail({ id: id });
            this.stationTypeRepo.merge(existingStationType, stationTypeBody);
            await this.stationTypeRepo.save(existingStationType);
            return ResponseUtils.sendResponse(res, "Station Type updated successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, existingStationType);

        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create specified station type", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, {error: error});
        }
    }

    async deleteStationType(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "station-type-controller.ts -> deleteStationType()";
        let stationTypeToRemove;
        try {
            try {
                stationTypeToRemove = await this.stationTypeRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find station type with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
            }
            await this.stationTypeRepo.remove(stationTypeToRemove);
            return ResponseUtils.sendResponse(res, "Station Type removed successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create specified station type", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, {error: error});
        }
    }
}