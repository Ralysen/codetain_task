import express from "express";
import { ChargingStationController } from "../controllers";

const chargingStationController = new ChargingStationController();
const router = express.Router();

router.get('/', chargingStationController.getStations);
router.get('/:id', chargingStationController.getStationById);
router.post('/', chargingStationController.createStation);
router.put('/:id', chargingStationController.updateStation);
router.delete('/:id', chargingStationController.deleteStation);

export default router;