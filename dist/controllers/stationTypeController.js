"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationTypeController = void 0;
const data_source_1 = require("../database/data-source");
const entity_1 = require("../entity");
const responseUtils_1 = require("../utils/responseUtils");
class StationTypeController {
    async getStationTypes(req, res) {
        const stationTypes = await data_source_1.AppDataSource.getRepository(entity_1.StationType);
        return responseUtils_1.ResponseUtils.sendResponse(res, stationTypes, 200);
    }
    async getStationType(req, res) {
        const { id } = req.params;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        const stationType = await repo.findOneBy({
            id: id
        });
        if (!stationType) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this station", 404);
        }
        return responseUtils_1.ResponseUtils.sendResponse(res, stationType, 200);
    }
    async createStationType(req, res) {
        const stationTypeBody = req.body;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        const stationType = repo.create(stationTypeBody);
        await repo.save(stationType);
        return responseUtils_1.ResponseUtils.sendResponse(res, stationType, 200);
    }
    async updateStationType(req, res) {
        const { id } = req.params;
        const stationTypeBody = req.body;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        const stationType = await repo.findOneBy({
            id: id,
        });
        if (!stationType) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this station", 404);
        }
        repo.merge(stationType, stationTypeBody);
        await repo.save((stationType));
        return responseUtils_1.ResponseUtils.sendResponse(res, stationType, 200);
    }
    async deleteStationType(req, res) {
        const { id } = req.params;
        const repo = data_source_1.AppDataSource.getRepository(entity_1.StationType);
        const stationType = await repo.findOneBy({
            id: id,
        });
        if (!stationType) {
            return responseUtils_1.ResponseUtils.sendError(res, "Cant find this station", 404);
        }
        await repo.remove(stationType);
        return responseUtils_1.ResponseUtils.sendResponse(res, stationType, 200);
    }
}
exports.StationTypeController = StationTypeController;
