import {ConnectorController} from "../controllers/connectorController";
import express from "express";

const connectorController = new ConnectorController();
const route = express.Router();

route.get('/connectors', connectorController.getConnectors);
route.get('/connector/:id', connectorController.getConnector);
route.post('/connector', connectorController.createConnector);
route.put('/connector/:id', connectorController.updateConnector);
route.delete('connector/:id', connectorController.deleteConnector);