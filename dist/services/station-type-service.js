"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationTypeService = void 0;
const entity_1 = require("../entity");
const data_source_1 = require("../database/data-source");
const pagination_1 = __importDefault(require("../middleware/pagination"));
class StationTypeService {
    async getAllStationTypes(page = 1, pageSize = 5) {
        const stationTypeRepo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        return pagination_1.default.paginate(stationTypeRepo, page, pageSize);
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
