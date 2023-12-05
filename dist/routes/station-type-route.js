"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const stationTypeController = new controllers_1.StationTypeController();
const router = express_1.default.Router();
router.get('/', stationTypeController.getStationTypes);
router.get('/:id', stationTypeController.getStationType);
router.post('/', stationTypeController.createStationType);
router.put('/:id', stationTypeController.updateStationType);
router.delete('/:id', stationTypeController.deleteStationType);
exports.default = router;
