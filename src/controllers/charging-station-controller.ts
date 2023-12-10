import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import { AppDataSource } from "../database/data-source";
import { ChargingStation, Connector, StationType } from "../entity";
import QueryCreator from "../middleware/query-creator";
import { validate } from "class-validator";

export class ChargingStationController {
    async getStations(req: Request, res: Response): Promise<Response> {
        const alias = "charging_station"
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const queryBuilder = chargingStationRepo.createQueryBuilder(alias);

        try {
            const stations = await QueryCreator.createQuery(req, queryBuilder, alias);
            return ResponseUtils.sendResponse(res, stations, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't ger stations list", 404, error)
        }

    }

    async getStationById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        let station;

        try {
            station = await chargingStationRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, station, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", 404);
        }

    }

    async createStation(req: Request, res: Response): Promise<Response> {
        const stationBody: ChargingStation = req.body;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const validateErrors = await validate(stationBody);

        if(validateErrors.length > 0) {
            return ResponseUtils.sendError(res, "Bad request", 400);
        }

        try {
            const newStation = chargingStationRepo.create(stationBody);
            await chargingStationRepo.save(newStation);

            return ResponseUtils.sendResponse(res, newStation, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Bad request", 500);
        }
    }

    async updateStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const stationBody = req.body;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        let updatedStation;
        let existingStation;

        try {
            try {
                existingStation = await chargingStationRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find station with specified id");
            }

            chargingStationRepo.merge(existingStation, stationBody);
            const validationErrors = await validate(existingStation);

            if(validationErrors.length>0) {
                return ResponseUtils.sendError(res, "Bad request", 400);
            }

            updatedStation = await chargingStationRepo.save(existingStation);
            return ResponseUtils.sendResponse(res, updatedStation, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create station", 500);
        }

    }

    async deleteStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        let stationToRemove;
        try {
            try {
                stationToRemove = await chargingStationRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find station", 404);
            }

            await chargingStationRepo.remove(stationToRemove);

            return ResponseUtils.sendResponse(res, {message: "Station remove successfully"}, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't remove station", 500);
        }
    }

    async getType(req: Request, res: Response):Promise<Response> {
        const { id } = req.params;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);

        try {
            const station = await chargingStationRepo.findOneOrFail( {
                where: {
                    id
                },
                relations: {
                    station_type: true
                }
            })
            const stationType = station.station_type;
            return ResponseUtils.sendResponse(res, { stationType }, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", 404);
        }
    }

    async getStationConnectors(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);

        try {
            const station = await chargingStationRepo.findOneOrFail({
                where: {
                    id
                },
                relations: {
                    connector: true
                }
            });
            const stationConnectors: Connector[] = station.connector;
            return ResponseUtils.sendResponse(res, { stationConnectors }, 200);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", 404);
        }
    }

    async setStationType(req: Request, res: Response): Promise<Response> {
        const { id, type_id } = req.params;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const stationTypeRepo = AppDataSource.getRepository(StationType);

        try {
            const station = await chargingStationRepo.findOneOrFail({
                where: {
                    id
                },
                relations: {
                    station_type: true
                }
            });

            if( station.station_type === null ) {
                //station = await chargingStationRepo.findOneByOrFail({id});
                station.station_type = await stationTypeRepo.findOneByOrFail({id: type_id});
                await chargingStationRepo.save(station);
                return ResponseUtils.sendResponse(res, station, 200);
            } else {
                return ResponseUtils.sendError(res, "This station already has type define", 400)
            }

        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", 404);
        }
    }

    async addConnectors(req: Request, res: Response):Promise<Response> {
        const { id, connector_id } = req.params;
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const connectorRepo = AppDataSource.getRepository(Connector);

        try {
            const station = await chargingStationRepo.findOneOrFail({
                where: {
                    id
                },
                relations: {
                    station_type: true,
                    connector: true
                }
            });
            const plug_count = station.station_type.plug_count.valueOf();
            const numOfConnectors = station.connector.length;
            const checkIfStationContainConnector = station.connector.some(conn => conn.id === connector_id);
            const checkConnectorsPriority = station.connector.some(conn => conn.priority);

            if (numOfConnectors >= plug_count) {
                return ResponseUtils.sendError(res, `Limit of defined connectors for this station`, 400);
            }

            if(checkIfStationContainConnector) {
                return ResponseUtils.sendError(res, "This connector is already define in this station", 400);
            }

            if(checkConnectorsPriority) {
                return ResponseUtils.sendError(res, "There is already one connector with priority", 400);
            }

            let connector;
            try {
                connector = await connectorRepo.findOneByOrFail({id: connector_id});
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find connector with specified id");
            }

            station.connector.push(connector);
            await chargingStationRepo.save(station);
            return ResponseUtils.sendResponse(res, station, 200);

        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", 404);
        }
    }
}