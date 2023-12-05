import { ChargingStation } from "../entity";
import { AppDataSource } from "../database/data-source";

export class ChargingStationService {
    async getAllStations(): Promise<ChargingStation[]> {
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        return await chargingStationRepo.find();
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