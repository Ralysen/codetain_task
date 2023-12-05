"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const data_source_1 = require("./database/data-source");
const middleware_1 = require("./middleware");
const station_type_route_1 = __importDefault(require("./routes/station-type-route"));
const connector_route_1 = __importDefault(require("./routes/connector-route"));
const charging_station_route_1 = __importDefault(require("./routes/charging-station-route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const corsOption = {
    origin: '*',
    methods: 'GET, POST, DELETE, PUT'
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/connectors", middleware_1.ErrorHandler.handleErrors(connector_route_1.default));
app.use("/stations", middleware_1.ErrorHandler.handleErrors(charging_station_route_1.default));
app.use("/station-types", middleware_1.ErrorHandler.handleErrors(station_type_route_1.default));
app.all("*", (req, res) => {
    return res.status(404).send({
        success: false,
        message: "Invalid route",
    });
});
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send({
        success: false,
        message: "Internal server error",
    });
});
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("DB initialized successfully");
})
    .catch((error) => console.error(error));
app.listen(port, () => {
    console.log(`[server]: Server is running at http:localhost:${port}`);
});
exports.default = app;
