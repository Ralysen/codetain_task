import { ChargingStation } from "../entity";
import { AppDataSource } from "../database/data-source";
import { PaginationResponse } from "../support/interfaces/pagination-response";
import { Request } from "express";
import QueryCreator from "../middleware/queryCreator";

export class ChargingStationService {
    async getAllStations(req: Request): Promise<PaginationResponse<ChargingStation>> {
        const alias = "charging_station"
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const queryBuilder = chargingStationRepo.createQueryBuilder(alias);
        const station = new ChargingStation();

        return QueryCreator.createQuery(req, queryBuilder, alias);
    }

    async getStationById(id: string): Promise<ChargingStation | null> {
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);

        return await chargingStationRepo.findOneBy({
            id: id,
        });
    }

    async createStation(stationData: Partial<ChargingStation>): Promise<ChargingStation> {
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const newStation = chargingStationRepo.create(stationData);

        return await chargingStationRepo.save(newStation);
    }

    async updateStation(id: string, stationNewData: Partial<ChargingStation>): Promise<ChargingStation | null> {
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const existingStation = await chargingStationRepo.findOneBy({
            id: id,
        });

        if (!existingStation) {
            return null;
        }

        chargingStationRepo.merge(existingStation, stationNewData);

        return await chargingStationRepo.save(existingStation);
    }

    async deleteStation(id: string): Promise<boolean> {
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const stationToRemove = await chargingStationRepo.findOneBy({
            id: id,
        });
        if(!stationToRemove)
        {
            return false;
        }
        await chargingStationRepo.remove(stationToRemove);

        return true;
    }
}
export default new ChargingStationService();