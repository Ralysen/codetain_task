import express from "express";
import { ChargingStationController } from "../controllers/chargingStationController";

const chargingStationController = new ChargingStationController();
const router = express.Router();

router.get('/stations', chargingStationController.getStations);
router.get('/station/:id', chargingStationController.getStation);
router.post('/station', chargingStationController.createStation);
router.put('/station/:id', chargingStationController.updateStation);
router.delete('station/:id', chargingStationController.deleteStation);