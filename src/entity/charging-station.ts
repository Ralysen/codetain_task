import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Connector } from "./connector";
import { StationType } from "./station-type";

@Entity()
export class ChargingStation {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column("uuid")
    device_id: string

    @Column()
    ip_address: string

    @Column()
    firmware_version: string

    @OneToMany(() => Connector, (connector) => connector.charging_station)
    connector: Connector[];

    @ManyToOne(() => StationType, (stationType) => stationType.charging_stations)
    station_type: StationType;
}