import { ConnectorController } from "../controllers/connectorController";
import express from "express";

const connectorController = new ConnectorController();
const route = express.Router();

route.get('/', connectorController.getConnectors);
route.get('/:id', connectorController.getConnector);
route.post('/', connectorController.createConnector);
route.put('/:id', connectorController.updateConnector);
route.delete('/:id', connectorController.deleteConnector);

export default route;