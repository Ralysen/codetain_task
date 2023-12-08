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
exports.StationType = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const chargingStation_1 = require("./chargingStation");
let StationType = class StationType {
};
exports.StationType = StationType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], StationType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StationType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], StationType.prototype, "plug_count", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], StationType.prototype, "efficiency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StationType.prototype, "current_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chargingStation_1.ChargingStation, (chargingStation) => chargingStation.stationType),
    __metadata("design:type", Array)
], StationType.prototype, "chargingStations", void 0);
exports.StationType = StationType = __decorate([
    (0, typeorm_1.Entity)()
], StationType);
