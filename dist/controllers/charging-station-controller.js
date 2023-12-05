"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingStationController = void 0;
const middleware_1 = require("../middleware");
const charging_station_service_1 = __importDefault(require("../services/charging-station-service"));
const pagination_1 = require("../middleware/pagination");
class ChargingStationController {
    async getStations(req, res) {
        const paginationSett = pagination_1.Pagination.handleQuery(req);
        const stations = await charging_station_service_1.default
            .getAllStations(paginationSett.page, paginationSett.limit);
        return middleware_1.ResponseUtils.sendResponse(res, stations, 200);
    }
    async getStationById(req, res) {
        const { id } = req.params;
        const station = await charging_station_service_1.default.getStationById(id);
        if (!station) {
            return middleware_1.ResponseUtils.sendError(res, "Station not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, station, 200);
    }
    async createStation(req, res) {
        const stationBody = req.body;
        const newStation = await charging_station_service_1.default.createStation(stationBody);
        return middleware_1.ResponseUtils.sendResponse(res, newStation, 200);
    }
    async updateStation(req, res) {
        const { id } = req.params;
        const stationBody = req.body;
        const updatedStation = await charging_station_service_1.default.updateStation(id, stationBody);
        if (!updatedStation) {
            return middleware_1.ResponseUtils.sendError(res, "Station not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, updatedStation, 200);
    }
    async deleteStation(req, res) {
        const { id } = req.params;
        const stationToDelete = await charging_station_service_1.default.deleteStation(id);
        if (!stationToDelete) {
            return middleware_1.ResponseUtils.sendError(res, "Station not found", 404);
        }
        return middleware_1.ResponseUtils.sendResponse(res, { message: "Station remove successfully" }, 200);
    }
}
exports.ChargingStationController = ChargingStationController;
