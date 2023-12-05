import { StationType } from "../entity";
import { AppDataSource } from "../database/data-source";
import Pagination from "../middleware/pagination";

export class StationTypeService {
    async getAllStationTypes(page: number = 1, pageSize: number = 5): Promise<{
        result: StationType[],
        total_count: number,
        last_page: number,
        actual_page: number
    }> {
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        return Pagination.paginate(stationTypeRepo, page, pageSize);
    }

    async getStationTypeById(id: string): Promise<StationType | null> {
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        return await stationTypeRepo.findOneBy({
            id: id,
        });
    }

    async createStationType(stationTypeData: Partial<StationType>): Promise<StationType> {
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        const newStationType = stationTypeRepo.create(stationTypeData);
        return await stationTypeRepo.save(newStationType);
    }

    async updateStationType(id: string, StationTypeNewData: Partial<StationType>): Promise<StationType | null> {
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        const existingStationType = await stationTypeRepo.findOneBy({
            id: id,
        });

        if(!existingStationType) {
            return null;
        }

        stationTypeRepo.merge(existingStationType, StationTypeNewData);
        return await stationTypeRepo.save(existingStationType);
    }

    async deleteStation(id: string): Promise<boolean> {
        const stationTypeRepo = AppDataSource.getRepository(StationType);
        const stationTypeToRemove = await stationTypeRepo.findOneBy({
            id: id,
        });

        if(!stationTypeToRemove) {
            return false;
        }

        await stationTypeRepo.remove(stationTypeToRemove);
        return true;
    }
}

export default new StationTypeService();