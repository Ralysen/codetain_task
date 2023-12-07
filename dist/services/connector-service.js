"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorService = void 0;
const entity_1 = require("../entity");
const data_source_1 = require("../database/data-source");
const pagination_1 = __importDefault(require("../middleware/pagination"));
class ConnectorService {
    async getAllConnectors(page = 1, pageSize = 5) {
        const connectorRepo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        return pagination_1.default.paginate(connectorRepo, page, pageSize);
    }
    async getConnectorById(id) {
        const connectorRepo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        return await connectorRepo.findOneBy({
            id: id,
        });
    }
    async createConnector(connectorData) {
        const connectorRepo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        const newConnector = connectorRepo.create(connectorData);
        return await connectorRepo.save(newConnector);
    }
    async updateConnector(id, connectorNewData) {
        const connectorRepo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        const existingConnector = await connectorRepo.findOneBy({
            id: id,
        });
        if (!existingConnector) {
            return null;
        }
        connectorRepo.merge(existingConnector, connectorNewData);
        return await connectorRepo.save(existingConnector);
    }
    async deleteStation(id) {
        const connectorRepo = data_source_1.AppDataSource.getRepository(entity_1.Connector);
        const connectorToRemove = await connectorRepo.findOneBy({
            id: id,
        });
        if (!connectorToRemove) {
            return false;
        }
        await connectorRepo.remove(connectorToRemove);
        return true;
    }
}
exports.ConnectorService = ConnectorService;
exports.default = new ConnectorService();
