"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    static handleErrors(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch((error) => {
                console.error(error);
                next(error);
            });
        };
    }
}
exports.ErrorHandler = ErrorHandler;
