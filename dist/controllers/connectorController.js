"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorController = void 0;
const data_source_1 = require("../database/data-source");
const entity_1 = require("../entity");
const responseUtils_1 = require("../utils/responseUtils");
class ConnectorController {
    async getConnectors(req, res) {
        const connectors = await data_source_1.AppDataSource.getRepository(entity_1.Connector).find();
        return responseUtils_1.ResponseUtils.sendResponse(res, connectors, 200);
    }
    async getConnector(req, res) {
        const { id } = req.params;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if (!connector) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this connector", 404);
        }
        return responseUtils_1.ResponseUtils.sendResponse(res, connector, 200);
    }
    async createConnector(req, res) {
        const connectorBody = req.body;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        const connector = repo.create(connectorBody);
        await repo.save(connector);
        return responseUtils_1.ResponseUtils.sendResponse(res, connector, 200);
    }
    async updateConnector(req, res) {
        const { id } = req.params;
        const connectorBody = req.body;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if (!connector) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this connector", 404);
        }
        repo.merge(connector, connectorBody);
        await repo.save((connector));
        return responseUtils_1.ResponseUtils.sendResponse(res, connector, 200);
    }
    async deleteConnector(req, res) {
        const { id } = req.params;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if (!connector) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this connector", 404);
        }
        await repo.remove(connector);
        return responseUtils_1.ResponseUtils.sendResponse(res, connector, 200);
    }
}
exports.ConnectorController = ConnectorController;
