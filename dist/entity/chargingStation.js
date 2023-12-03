var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Connector } from "./connector";
import { StationType } from "./stationType";
let ChargingStation = class ChargingStation {
    id;
    name;
    device_id;
    ip_address;
    firmware_version;
    connector;
    stationType;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], ChargingStation.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ChargingStation.prototype, "name", void 0);
__decorate([
    Column("uuid"),
    __metadata("design:type", String)
], ChargingStation.prototype, "device_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ChargingStation.prototype, "ip_address", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ChargingStation.prototype, "firmware_version", void 0);
__decorate([
    OneToMany(() => Connector, (connector) => connector.chargingStation),
    __metadata("design:type", Array)
], ChargingStation.prototype, "connector", void 0);
__decorate([
    ManyToOne(() => StationType, (stationType) => stationType.chargingStations),
    JoinColumn({ name: "station_type_id" }),
    __metadata("design:type", StationType)
], ChargingStation.prototype, "stationType", void 0);
ChargingStation = __decorate([
    Entity()
], ChargingStation);
export { ChargingStation };
//# sourceMappingURL=chargingStation.js.map