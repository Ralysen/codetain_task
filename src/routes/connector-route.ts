import { ConnectorController } from "../controllers";
import express from "express";

const connectorController = new ConnectorController();
const router = express.Router();

router.get('/', connectorController.getConnectors);
router.get('/:id', connectorController.getConnector);
router.post('/', connectorController.createConnector);
router.put('/:id', connectorController.updateConnector);
router.delete('/:id', connectorController.deleteConnector);

export default router;