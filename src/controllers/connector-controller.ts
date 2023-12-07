import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import ConnectorService from "../services/connector-service";

export class ConnectorController {
    async getConnectors(req: Request, res: Response): Promise<Response> {
        const connectors = await ConnectorService.getAllConnectors(req);
        return ResponseUtils.sendResponse(res, connectors, 200);
    }

    async getConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const connector = await ConnectorService.getConnectorById(id);

        if(!connector){
            return ResponseUtils.sendError(res, "Connector not found", 404);
        }

        return ResponseUtils.sendResponse(res, connector, 200);
    }

    async createConnector(req: Request, res: Response): Promise<Response> {
        const connectorBody = req.body;
        const newConnector = await ConnectorService.createConnector(connectorBody);
        return ResponseUtils.sendResponse(res, newConnector, 200);
    }

    async updateConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const connectorBody = req.body;
        const connector = await ConnectorService.updateConnector(id, connectorBody);

        if(!connector){
            return ResponseUtils.sendError(res, "Connector not found", 404);
        }

        return ResponseUtils.sendResponse(res, connector, 200);
    }

    async deleteConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const connector = await ConnectorService.deleteStation(id);

        if(!connector) {
            return ResponseUtils.sendError(res, "Connector not found", 404);
        }

        return ResponseUtils.sendResponse(res, connector, 200);
    }
}