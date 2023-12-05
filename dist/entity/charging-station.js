"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingStation = void 0;
const typeorm_1 = require("typeorm");
const connector_1 = require("./connector");
const station_type_1 = require("./station-type");
let ChargingStation = class ChargingStation {
};
exports.ChargingStation = ChargingStation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ChargingStation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChargingStation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], ChargingStation.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChargingStation.prototype, "ip_address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChargingStation.prototype, "firmware_version", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => connector_1.Connector, (connector) => connector.charging_station),
    __metadata("design:type", Array)
], ChargingStation.prototype, "connector", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => station_type_1.StationType, (stationType) => stationType.charging_stations),
    __metadata("design:type", station_type_1.StationType)
], ChargingStation.prototype, "station_type", void 0);
exports.ChargingStation = ChargingStation = __decorate([
    (0, typeorm_1.Entity)()
], ChargingStation);
