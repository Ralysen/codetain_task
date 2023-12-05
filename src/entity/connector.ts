import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChargingStation } from "./charging-station";

@Entity()
export class Connector {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    priority: boolean;

    @ManyToOne(() => ChargingStation, (chargingStation) => chargingStation.connector)
    charging_station: ChargingStation
}