
/*
stationType.hasMany(chargingStation, {
    foreignKey: "charging_station_id"
});*/

import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StationCurrentType} from "../enums";
import {ChargingStation} from "./chargingStation";

@Entity()
export class StationType {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column("integer")
    plug_count: number

    @Column("float")
    efficiency: number

    @Column()
    current_type: StationCurrentType

    @OneToMany(() => ChargingStation, (chargingStation) => chargingStation.stationType)
    chargingStations: ChargingStation[];
}
