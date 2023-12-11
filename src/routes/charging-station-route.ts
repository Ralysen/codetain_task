import express from "express";
import { ChargingStationController } from "../controllers";
import { TokenHandler } from "../middleware/token-handler";

const chargingStationController = new ChargingStationController();
const router = express.Router();

router.get('/', [TokenHandler], chargingStationController.getStations);
router.get('/:id', [TokenHandler], chargingStationController.getStationById);
router.post('/', [TokenHandler], chargingStationController.createStation);
router.put('/:id', [TokenHandler], chargingStationController.updateStation);
router.delete('/:id', [TokenHandler], chargingStationController.deleteStation);
router.get('/:id/type', [TokenHandler], chargingStationController.getType);
router.get('/:id/connectors', [TokenHandler], chargingStationController.getStationConnectors);
router.post('/:id/connectors/:connector_id', [TokenHandler], chargingStationController.addConnectors);
router.post('/:id/type/:type_id', [TokenHandler], chargingStationController.setStationType);

export default router;