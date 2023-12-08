"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtils = void 0;
class ResponseUtils {
    static sendResponse(res, data, statusCode = 200) {
        return res.status(statusCode).send({
            success: true,
            message: "Success",
            data,
        });
    }
    static sendError(res, message, statusCode = 500, errors = null) {
        return res.status(statusCode).send({
            success: false,
            message,
            errors
        });
    }
}
exports.ResponseUtils = ResponseUtils;
