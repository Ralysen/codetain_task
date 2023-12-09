import { Response } from "express";
import * as console from "console";

export  class ResponseUtils {
    static sendResponse<T>(
        res: Response,
        data: T,
        statusCode = 200
    ): Response<T> {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} [INFO] [API]: ${data}`)

        return res.status(statusCode).send({
            success: true,
            message: "Success",
            data,
        });
    }

    static sendError(
    res: Response,
    message: string,
    statusCode = 500,
    errors?: any
    ): Response {
        const timestamp = new Date().toISOString();
        console.error(`${timestamp} [Error]: ${message}`)

        return res.status(statusCode).send({
            success: false,
            message,
            errors
        });
    }
}