"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationTypeService = void 0;
const entity_1 = require("../entity");
const data_source_1 = require("../database/data-source");
class StationTypeService {
    async getAllStationTypes() {
        const stationTypeRepo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        return await stationTypeRepo.find();
    }
    async getStationTypeById(id) {
        const stationTypeRepo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        return await stationTypeRepo.findOneBy({
            id: id,
        });
    }
    async createStationType(stationTypeData) {
        const stationTypeRepo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        const newStationType = stationTypeRepo.create(stationTypeData);
        return await stationTypeRepo.save(newStationType);
    }
    async updateStationType(id, StationTypeNewData) {
        const stationTypeRepo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        const existingStationType = await stationTypeRepo.findOneBy({
            id: id,
        });
        if (!existingStationType) {
            return null;
        }
        stationTypeRepo.merge(existingStationType, StationTypeNewData);
        return await stationTypeRepo.save(existingStationType);
    }
    async deleteStation(id) {
        const stationTypeRepo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        const stationTypeToRemove = await stationTypeRepo.findOneBy({
            id: id,
        });
        if (!stationTypeToRemove) {
            return false;
        }
        await stationTypeRepo.remove(stationTypeToRemove);
        return true;
    }
}
exports.StationTypeService = StationTypeService;
exports.default = new StationTypeService();
