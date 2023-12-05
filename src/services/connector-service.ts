import { Connector } from "../entity";
import { AppDataSource } from "../database/data-source";
import Pagination from "../middleware/pagination";

export class ConnectorService {
    async getAllConnectors(page: number = 1, pageSize: number = 5): Promise<{
        result: Connector[],
        total_count: number,
        last_page: number,
        actual_page: number
    }> {
        const connectorRepo = AppDataSource.getRepository(Connector);
        return Pagination.paginate(connectorRepo, page, pageSize);
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