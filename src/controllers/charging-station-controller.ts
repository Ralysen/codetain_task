import { Request, Response } from "express";
import { ResponseUtils } from "../middleware";
import { AppDataSource } from "../database/data-source";
import { ChargingStation, Connector, StationType} from "../entity";
import QueryCreator from "../middleware/query-creator";
import { validate } from "class-validator";
import { ResponseCodes } from "../support/enums";
import { ResponseMessages } from "../support/objects/responseMessages";

export class ChargingStationController {

    async getStations(req: Request, res: Response): Promise<Response> {
        const logContext = "charging-station-controller.ts -> getStations()";
        const alias = "charging_station";
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const queryBuilder = chargingStationRepo.createQueryBuilder(alias);

        try {
            const stations = await QueryCreator.createQuery(req, queryBuilder, alias);
            return ResponseUtils.sendResponse(res, "Get stations list successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, stations);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't get stations list", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
        }

    }

    async getStationById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "charging-station-controller.ts -> getStationById()";
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        let station;

        try {
            station = await chargingStationRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, "Get station successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, station);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
        }

    }

    async createStation(req: Request, res: Response): Promise<Response> {
        const stationBody: ChargingStation = req.body;
        const logContext = "charging-station-controller.ts -> createStation()";
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const validateErrors = await validate(stationBody);

        if(validateErrors.length > 0) {
            return ResponseUtils.sendError(res, "", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
        }

        try {
            const newStation = chargingStationRepo.create(stationBody);
            await chargingStationRepo.save(newStation);

            return ResponseUtils.sendResponse(res, "", ResponseCodes.CREATED, ResponseMessages[ResponseCodes.CREATED], logContext, newStation);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create station", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
        }
    }

    async updateStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "charging-station-controller.ts -> updateStation()";
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        const stationBody = req.body;
        let updatedStation;
        let existingStation;

        try {
            try {
                existingStation = await chargingStationRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find station with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
            }

            chargingStationRepo.merge(existingStation, stationBody);
            const validationErrors = await validate(existingStation);

            if(validationErrors.length>0) {
                return ResponseUtils.sendError(res, "", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
            }

            updatedStation = await chargingStationRepo.save(existingStation);
            return ResponseUtils.sendResponse(res, "Station updated successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, updatedStation);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't update station with specified id", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
        }

    }

    async deleteStation(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "charging-station-controller.ts -> deleteStation()";
        const chargingStationRepo = AppDataSource.getRepository(ChargingStation);
        let stationToRemove;
        try {
            try {
                stationToRemove = await chargingStationRepo.findOneByOrFail({ id: id });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find station with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
            }

            await chargingStationRepo.remove(stationToRemove);

            return ResponseUtils.sendResponse(res, "Station remove successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't remove station with specified id", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
        }
    }

    async getType(req: Request, res: Response):Promise<Response> {
        const { id } = req.params;
        const logContext = "charging-station-controller.ts -> getType()";
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
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, stationType);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
        }
    }

    async getStationConnectors(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "charging-station-controller.ts -> getStationConnectors()";
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
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, stationConnectors);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
        }
    }

    async setStationType(req: Request, res: Response): Promise<Response> {
        const { id, type_id } = req.params;
        const logContext = "charging-station-controller.ts -> setStationType()";
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
                station.station_type = await stationTypeRepo.findOneByOrFail({id: type_id});
                await chargingStationRepo.save(station);
                return ResponseUtils.sendResponse(res, "Station type set successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, station);
            } else {
                return ResponseUtils.sendError(res, "This station already has type define", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext)
            }

        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find station with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
        }
    }

    async addConnectors(req: Request, res: Response):Promise<Response> {
        const { id, connector_id } = req.params;
        const logContext = "charging-station-controller.ts -> addConnectors()";
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
                return ResponseUtils.sendError(res, `Limit of defined connectors for this station`, ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
            }

            if(checkIfStationContainConnector) {
                return ResponseUtils.sendError(res, "This connector is already define in this station", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
            }

            if(checkConnectorsPriority) {
                return ResponseUtils.sendError(res, "There is already one connector with priority = true", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext);
            }

            let connector;
            try {
                connector = await connectorRepo.findOneByOrFail({id: connector_id});
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find connector with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
            }

            station.connector.push(connector);
            await chargingStationRepo.save(station);
            return ResponseUtils.sendResponse(res, "Connector added successfully to the station", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, station);

        } catch (error) {
            return ResponseUtils.sendError(res, "Can't add this connector to this station", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, error);
        }
    }
}