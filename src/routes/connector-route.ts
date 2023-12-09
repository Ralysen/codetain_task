import { ConnectorController } from "../controllers";
import express from "express";
import { TokenHandler } from "../middleware/token-handler";

const connectorController = new ConnectorController();
const router = express.Router();

router.get('/', [TokenHandler], connectorController.getConnectors);
router.get('/:id', [TokenHandler], connectorController.getConnector);
router.post('/', [TokenHandler], connectorController.createConnector);
router.put('/:id', [TokenHandler], connectorController.updateConnector);
router.delete('/:id', [TokenHandler], connectorController.deleteConnector);

export default router;