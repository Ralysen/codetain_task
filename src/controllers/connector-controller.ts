import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Connector } from "../entity";
import { ResponseUtils } from "../middleware/response-utils";

export class ConnectorController {
    async getConnectors(req: Request, res: Response): Promise<Response> {
        const connectors = await AppDataSource.getRepository(Connector).find();
        return ResponseUtils.sendResponse(res, connectors, 200);
    }
    async getConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if(!connector){
            return ResponseUtils.sendError(res, "Connector not found", 404);
        }
        return ResponseUtils.sendResponse(res, connector, 200);
    }
    async createConnector(req: Request, res: Response): Promise<Response> {
        const connectorBody = req.body;
        const repo = AppDataSource.getRepository(Connector);
        const connector = repo.create(connectorBody);
        await repo.save(connector);
        return ResponseUtils.sendResponse(res, connector, 200);
    }
    async updateConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const connectorBody = req.body;
        const repo = AppDataSource.getRepository(Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if(!connector){
            return ResponseUtils.sendError(res, "Connector not found", 404);
        }
        repo.merge(connector, connectorBody);
        await repo.save((connector));
        return ResponseUtils.sendResponse(res, connector, 200);
    }
    async deleteConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if(!connector) {
            return ResponseUtils.sendError(res, "Connector not found", 404);
        }
        await repo.remove(connector);
        return ResponseUtils.sendResponse(res, connector, 200);
    }
}