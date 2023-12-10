import {Request, Response} from "express";
import {ResponseUtils} from "../middleware";
import {AppDataSource} from "../database/data-source";
import {Connector} from "../entity";
import QueryCreator from "../middleware/query-creator";
import {validate} from "class-validator";
import {ResponseCodes} from "../support/enums";
import {ResponseMessages} from "../support/objects/responseMessages";

export class ConnectorController {

    async getConnectors(req: Request, res: Response): Promise<Response> {
        const alias = "connector";
        const logContext = "connector-controller.ts -> getConnectors()";
        const connectorRepo = AppDataSource.getRepository(Connector);
        const queryBuilder = connectorRepo.createQueryBuilder(alias);

        try {
            const connectors = await QueryCreator.createQuery(req, queryBuilder, alias);
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, connectors);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't get connectors list", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
        }
    }

    async getConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "connector-controller.ts -> getConnector()";
        const connectorRepo = AppDataSource.getRepository(Connector);
        let connector: Connector;

        try {
            connector = await connectorRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, connector);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't get connector with specified id", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
        }
    }

    async createConnector(req: Request, res: Response): Promise<Response> {
        const connectorBody: Connector = req.body;
        const logContext = "connector-controller.ts -> createConnector()";
        const connectorRepo = AppDataSource.getRepository(Connector);
        const validateErrors = await validate(connectorBody);

        if(validateErrors.length>0) {
            return ResponseUtils.sendError(res, "", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
        }

        try{
            const newConnector = connectorRepo.create(connectorBody);
            await connectorRepo.save(newConnector);
            return ResponseUtils.sendResponse(res, "", ResponseCodes.CREATED, ResponseMessages[ResponseCodes.CREATED], logContext, newConnector);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create connector with specified id", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
        }
    }

    async updateConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "connector-controller.ts -> updateConnector()";
        const connectorRepo = AppDataSource.getRepository(Connector);
        const connectorBody = req.body;
        let existingConnector;
        try {
            try {
                existingConnector = await connectorRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find connector with specified id",ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
            }
            connectorRepo.merge(existingConnector, connectorBody);
            await connectorRepo.save(existingConnector);
            return ResponseUtils.sendResponse(res, "Connector updated successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, existingConnector);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't update connector with specified id", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
        }

    }

    async deleteConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "connector-controller.ts -> deleteConnector()";
        const connectorRepo = AppDataSource.getRepository(Connector);
        let connectorToRemove;

        try {

            try {
                connectorToRemove = await connectorRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find connector with specified id",ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
            }

            await connectorRepo.remove(connectorToRemove);
            return ResponseUtils.sendResponse(res, "Connector deleted successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, connectorToRemove);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't delete connector with specified id", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
        }
    }
}