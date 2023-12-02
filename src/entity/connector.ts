import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ChargingStation} from "./chargingStation";
import { JoinColumn } from "typeorm";

@Entity()
export class Connector {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    priority: boolean;

    @ManyToOne(() => ChargingStation, (chargingStation) => chargingStation.connector)
    @JoinColumn({name: "charging_station_id"})
    chargingStation: ChargingStation
}