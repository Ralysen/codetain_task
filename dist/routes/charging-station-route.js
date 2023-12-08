"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const chargingStationController = new controllers_1.ChargingStationController();
const router = express_1.default.Router();
router.get('/', chargingStationController.getStations);
router.get('/:id', chargingStationController.getStationById);
router.post('/', chargingStationController.createStation);
router.put('/:id', chargingStationController.updateStation);
router.delete('/:id', chargingStationController.deleteStation);
exports.default = router;
