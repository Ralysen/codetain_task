"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorController = void 0;
const middleware_1 = require("../middleware");
const connector_service_1 = __importDefault(require("../services/connector-service"));
const pagination_1 = require("../middleware/pagination");
class ConnectorController {
    async getConnectors(req, res) {
        const paginationSett = pagination_1.Pagination.handleQuery(req);
        const connectors = await connector_service_1.default.getAllConnectors(paginationSett.page, paginationSett.limit);
        return middleware_1.ResponseUtils.sendResponse(res, connectors, 200);
    }
    async getConnector(req, res) {
        const { id } = req.params;
        const connector = await connector_service_1.default.getConnectorById(id);
        if (!connector) {
            return middleware_1.ResponseUtils.sendError(res, "Connector not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, connector, 200);
    }
    async createConnector(req, res) {
        const connectorBody = req.body;
        const newConnector = await connector_service_1.default.createConnector(connectorBody);
        return middleware_1.ResponseUtils.sendResponse(res, newConnector, 200);
    }
    async updateConnector(req, res) {
        const { id } = req.params;
        const connectorBody = req.body;
        const connector = await connector_service_1.default.updateConnector(id, connectorBody);
        if (!connector) {
            return middleware_1.ResponseUtils.sendError(res, "Connector not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, connector, 200);
    }
    async deleteConnector(req, res) {
        const { id } = req.params;
        const connector = await connector_service_1.default.deleteStation(id);
        if (!connector) {
            return middleware_1.ResponseUtils.sendError(res, "Connector not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, connector, 200);
    }
}
exports.ConnectorController = ConnectorController;
