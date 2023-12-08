import express from "express";
import { StationTypeController } from "../controllers";

const stationTypeController = new StationTypeController();
const router = express.Router();

router.get('/', stationTypeController.getStationTypes);
router.get('/:id', stationTypeController.getStationType);
router.post('/', stationTypeController.createStationType);
router.put('/:id', stationTypeController.updateStationType);
router.delete('/:id', stationTypeController.deleteStationType);

export default router;