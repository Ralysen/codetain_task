import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import { AppDataSource } from "../database/data-source";
import { Connector } from "../entity";
import QueryCreator from "../middleware/query-creator";
import { validate } from "class-validator";

export class ConnectorController {
    async getConnectors(req: Request, res: Response): Promise<Response> {
        const alias = "connector";
        const connectorRepo = AppDataSource.getRepository(Connector);
        const queryBuilder = connectorRepo.createQueryBuilder(alias);

        try {
            const connectors = await QueryCreator.createQuery(req, queryBuilder, alias);
            return ResponseUtils.sendResponse(res, connectors, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't get connectors list", 500);
        }
    }

    async getConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const connectorRepo = AppDataSource.getRepository(Connector);
        let connector: Connector;

        try {
            connector = await connectorRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, connector, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't get connector", 500)
        }
    }

    async createConnector(req: Request, res: Response): Promise<Response> {
        const connectorBody: Connector = req.body;
        const connectorRepo = AppDataSource.getRepository(Connector);
        const validateErrors = await validate(connectorBody);

        if(validateErrors.length>0) {
            return ResponseUtils.sendError(res, "Bad request", 400);
        }

        try{
            const newConnector = connectorRepo.create(connectorBody);
            await connectorRepo.save(newConnector);
            return ResponseUtils.sendResponse(res, newConnector, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create station", 500);
        }
    }

    async updateConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const connectorBody = req.body;
        const connectorRepo = AppDataSource.getRepository(Connector);

        try {
            const existingConnector = await connectorRepo.findOneByOrFail({ id: id });
            connectorRepo.merge(existingConnector, connectorBody);
            await connectorRepo.save(existingConnector);
            return ResponseUtils.sendResponse(res, existingConnector, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create connector", 500);
        }

    }

    async deleteConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const connectorRepo = AppDataSource.getRepository(Connector);
        let connectorToRemove;

        try {

            try {
                connectorToRemove = await connectorRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find specified connector", 404);
            }

            await connectorRepo.remove(connectorToRemove);
            return ResponseUtils.sendResponse(res, connectorToRemove, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't remove connector", 500);
        }
    }
}