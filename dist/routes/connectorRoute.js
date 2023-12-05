"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectorController_1 = require("../controllers/connectorController");
const express_1 = __importDefault(require("express"));
const connectorController = new connectorController_1.ConnectorController();
const route = express_1.default.Router();
route.get('/', connectorController.getConnectors);
route.get('/:id', connectorController.getConnector);
route.post('/', connectorController.createConnector);
route.put('/:id', connectorController.updateConnector);
route.delete('/:id', connectorController.deleteConnector);
exports.default = route;
