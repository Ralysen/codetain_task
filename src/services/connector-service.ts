import { Connector } from "../entity";
import { AppDataSource } from "../database/data-source";
import { PaginationResponse } from "../support/interfaces/pagination-response";
import { Request } from "express";
import QueryCreator from "../middleware/queryCreator";

export class ConnectorService {
    async getAllConnectors(req: Request): Promise<PaginationResponse<Connector>> {
        const alias = "connector";
        const connectorRepo = AppDataSource.getRepository(Connector);
        const queryBuilder = connectorRepo.createQueryBuilder(alias);

        return QueryCreator.createQuery(req, queryBuilder, alias);
    }

    async getConnectorById(id: string): Promise<Connector | null> {
        const connectorRepo = AppDataSource.getRepository(Connector);

        return await connectorRepo.findOneBy({
            id: id,
        });
    }

    async createConnector(connectorData: Partial<Connector>): Promise<Connector> {
        const connectorRepo = AppDataSource.getRepository(Connector);
        const newConnector = connectorRepo.create(connectorData);

        return await connectorRepo.save(newConnector);
    }

    async updateConnector(id: string, connectorNewData: Partial<Connector>): Promise<Connector | null> {
        const connectorRepo = AppDataSource.getRepository(Connector);
        const existingConnector = await connectorRepo.findOneBy({
            id: id,
        });

        if(!existingConnector) {
            return null;
        }

        connectorRepo.merge(existingConnector, connectorNewData);
        return await connectorRepo.save(existingConnector);
    }

    async deleteStation(id: string): Promise<boolean> {
        const connectorRepo = AppDataSource.getRepository(Connector);
        const connectorToRemove = await connectorRepo.findOneBy({
            id: id,
        });

        if(!connectorToRemove) {
            return false;
        }

        await connectorRepo.remove(connectorToRemove);
        return true;
    }
}

export default new ConnectorService();