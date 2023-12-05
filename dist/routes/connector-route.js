"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const connectorController = new controllers_1.ConnectorController();
const router = express_1.default.Router();
router.get('/', connectorController.getConnectors);
router.get('/:id', connectorController.getConnector);
router.post('/', connectorController.createConnector);
router.put('/:id', connectorController.updateConnector);
router.delete('/:id', connectorController.deleteConnector);
exports.default = router;
