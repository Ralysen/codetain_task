"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingStationController = void 0;
const data_source_1 = require("../database/data-source");
const entity_1 = require("../entity");
const responseUtils_1 = require("../utils/responseUtils");
class ChargingStationController {
    async getStations(req, res) {
        const stations = await data_source_1.AppDataSource.getRepository(entity_1.ChargingStation).find();
        return responseUtils_1.ResponseUtils.sendResponse(res, stations, 200);
    }
    async getStation(req, res) {
        const { id } = req.params;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if (!station) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this station", 404);
        }
        return responseUtils_1.ResponseUtils.sendResponse(res, station, 200);
    }
    async createStation(req, res) {
        const stationBody = req.body;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        const station = repo.create(stationBody);
        await repo.save(station);
        return responseUtils_1.ResponseUtils.sendResponse(res, station, 200);
    }
    async updateStation(req, res) {
        const { id } = req.params;
        const stationBody = req.body;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if (!station) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this station", 404);
        }
        repo.merge(station, stationBody);
        await repo.save((station));
        return responseUtils_1.ResponseUtils.sendResponse(res, station, 200);
    }
    async deleteStation(req, res) {
        const { id } = req.params;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.ChargingStation);
        const station = await repo.findOneBy({
            id: id,
        });
        if (!station) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this station", 404);
        }
        await repo.remove(station);
        return responseUtils_1.ResponseUtils.sendResponse(res, null);
    }
}
exports.ChargingStationController = ChargingStationController;
