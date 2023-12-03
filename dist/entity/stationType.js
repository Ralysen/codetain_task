/*
stationType.hasMany(chargingStation, {
    foreignKey: "charging_station_id"
});*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StationCurrentType } from "../enums";
import { ChargingStation } from "./chargingStation";
let StationType = class StationType {
    id;
    name;
    plug_count;
    efficiency;
    current_type;
    chargingStations;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], StationType.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], StationType.prototype, "name", void 0);
__decorate([
    Column("integer"),
    __metadata("design:type", Number)
], StationType.prototype, "plug_count", void 0);
__decorate([
    Column("float"),
    __metadata("design:type", Number)
], StationType.prototype, "efficiency", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], StationType.prototype, "current_type", void 0);
__decorate([
    OneToMany(() => ChargingStation, (chargingStation) => chargingStation.stationType),
    __metadata("design:type", Array)
], StationType.prototype, "chargingStations", void 0);
StationType = __decorate([
    Entity()
], StationType);
export { StationType };
//# sourceMappingURL=stationType.js.map