import {StationTypeController} from "../controllers/stationTypeController";
import express from "express";

const stationTypeController = new StationTypeController();
const route = express.Router();

route.get('/station/types', stationTypeController.getStationTypes);
route.get('/station/type/:id', stationTypeController.getStationType);
route.post('/station/type', stationTypeController.createStationType);
route.put('/station/type/:id', stationTypeController.updateStationType);
route.delete('/station/type/:id', stationTypeController.deleteStationType);