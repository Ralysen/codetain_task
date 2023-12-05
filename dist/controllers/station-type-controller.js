"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationTypeController = void 0;
const middleware_1 = require("../middleware");
const station_type_service_1 = __importDefault(require("../services/station-type-service"));
class StationTypeController {
    async getStationTypes(req, res) {
        const stationTypes = await station_type_service_1.default.getAllStationTypes();
        return middleware_1.ResponseUtils.sendResponse(res, stationTypes, 200);
    }
    async getStationType(req, res) {
        const { id } = req.params;
        const stationType = await station_type_service_1.default.getStationTypeById(id);
        if (!stationType) {
            return middleware_1.ResponseUtils.sendError(res, "Station type not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, stationType, 200);
    }
    async createStationType(req, res) {
        const stationTypeBody = req.body;
        const stationType = await station_type_service_1.default.createStationType(stationTypeBody);
        return middleware_1.ResponseUtils.sendResponse(res, stationType, 200);
    }
    async updateStationType(req, res) {
        const { id } = req.params;
        const stationTypeBody = req.body;
        const stationType = await station_type_service_1.default.updateStationType(id, stationTypeBody);
        if (!stationType) {
            return middleware_1.ResponseUtils.sendError(res, "Station type not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, stationType, 200);
    }
    async deleteStationType(req, res) {
        const { id } = req.params;
        const stationTypeToRemove = await station_type_service_1.default.deleteStation(id);
        if (!stationTypeToRemove) {
            return middleware_1.ResponseUtils.sendError(res, "Station type not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, stationTypeToRemove, 200);
    }
}
exports.StationTypeController = StationTypeController;
