import express from "express";
import { StationTypeController } from "../controllers";
import { TokenHandler } from "../middleware/token-handler";

const stationTypeController = new StationTypeController();
const router = express.Router();

router.get('/', [TokenHandler], stationTypeController.getStationTypes);
router.get('/:id', [TokenHandler], stationTypeController.getStationType);
router.post('/', [TokenHandler], stationTypeController.createStationType);
router.put('/:id', [TokenHandler], stationTypeController.updateStationType);
router.delete('/:id', [TokenHandler], stationTypeController.deleteStationType);
router.get('/:id/stations', [TokenHandler]);

export default router;