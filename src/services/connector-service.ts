import { Connector } from "../entity";
import { AppDataSource } from "../database/data-source";

export class ConnectorService {
    async getAllConnectors(): Promise<Connector[]> {
        const connectorRepo = AppDataSource.getRepository(Connector);
        return await connectorRepo.find();
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