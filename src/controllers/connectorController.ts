import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Connector } from "../entity";

export class ConnectorController {
    async getConnectors(req: Request, res: Response): Promise<Response> {
        const connectors = await AppDataSource.getRepository(Connector).find();
        return res.send(connectors);
    }
    async getConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if(!connector){
            return res.json({message: "Cant find this connector"});
        }
        return res.send(connector);
    }
    async createConnector(req: Request, res: Response): Promise<Response> {
        const connectorBody = req.body;
        const repo = AppDataSource.getRepository(Connector);
        const connector = repo.create(connectorBody);
        await repo.save(connector);
        return res.send(connector);
    }
    async updateConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const connectorBody = req.body;
        const repo = AppDataSource.getRepository(Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if(!connector){
            return res.json("Cant find this connector");
        }
        repo.merge(connector, connectorBody);
        await repo.save((connector));
        return res.send(connector);
    }
    async deleteConnector(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Connector);
        const connector = await repo.findOneBy({
            id: id,
        });
        if(!connector) {
            return res.json({message: "Cant find this connector"});
        }
        await repo.remove(connector);
        return res.send(res);
    }
}