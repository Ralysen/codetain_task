import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Connector} from "./connector";
import {StationType} from "./stationType";

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

    @OneToMany(() => Connector, (connector) => connector.chargingStation)
    connector: Connector[]

    @ManyToOne(() => StationType, (stationType) => stationType.chargingStations)
    @JoinColumn({name: "station_type_id"})
    stationType: StationType;
}