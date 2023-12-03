var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChargingStation } from "./chargingStation";
import { JoinColumn } from "typeorm";
let Connector = class Connector {
    id;
    name;
    priority;
    chargingStation;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Connector.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Connector.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], Connector.prototype, "priority", void 0);
__decorate([
    ManyToOne(() => ChargingStation, (chargingStation) => chargingStation.connector),
    JoinColumn({ name: "charging_station_id" }),
    __metadata("design:type", ChargingStation)
], Connector.prototype, "chargingStation", void 0);
Connector = __decorate([
    Entity()
], Connector);
export { Connector };
//# sourceMappingURL=connector.js.map