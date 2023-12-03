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
const errorHandler_1 = require("./utils/errorHandler");
const connectorRoute_1 = __importDefault(require("./routes/connectorRoute"));
const chargingStationRoute_1 = __importDefault(require("./routes/chargingStationRoute"));
const stationTypeRoute_1 = __importDefault(require("./routes/stationTypeRoute"));
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
app.use("/connectors", errorHandler_1.ErrorHandler.handleErrors(connectorRoute_1.default));
app.use("/station", errorHandler_1.ErrorHandler.handleErrors(chargingStationRoute_1.default));
app.use("/station/types", errorHandler_1.ErrorHandler.handleErrors(stationTypeRoute_1.default));
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
