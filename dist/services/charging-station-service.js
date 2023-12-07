"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingStationService = void 0;
const entity_1 = require("../entity");
const data_source_1 = require("../database/data-source");
const queryCreator_1 = __importDefault(require("../middleware/queryCreator"));
class ChargingStationService {
    async getAllStations(req) {
        const chargingStationRepo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        const queryBuilder = chargingStationRepo.createQueryBuilder("charging_station");
        const station = new entity_1.ChargingStation();
        return queryCreator_1.default.createQuery(req, queryBuilder, station);
    }
    async getStationById(id) {
        const chargingStationRepo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        return await chargingStationRepo.findOneBy({
            id: id,
        });
    }
    async createStation(stationData) {
        const chargingStationRepo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        const newStation = chargingStationRepo.create(stationData);
        return await chargingStationRepo.save(newStation);
    }
    async updateStation(id, stationNewData) {
        const chargingStationRepo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        const existingStation = await chargingStationRepo.findOneBy({
            id: id,
        });
        if (!existingStation) {
            return null;
        }
        chargingStationRepo.merge(existingStation, stationNewData);
        return await chargingStationRepo.save(existingStation);
    }
    async deleteStation(id) {
        const chargingStationRepo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        const stationToRemove = await chargingStationRepo.findOneBy({
            id: id,
        });
        if (!stationToRemove) {
            return false;
        }
        await chargingStationRepo.remove(stationToRemove);
        return true;
    }
}
exports.ChargingStationService = ChargingStationService;
exports.default = new ChargingStationService();
