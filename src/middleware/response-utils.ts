import { Response } from "express";
import * as console from "console";
import {LogLevels, ResponseCodes} from "../support/enums";
import {ErrorHandler} from "./error-handler";
import {ResponseMessages} from "../support/objects/responseMessages";

export  class ResponseUtils {
    static sendResponse<T>(
        res: Response,
        message: string,
        statusCode = 200,
        resMessage: string,
        context: string,
        data?: T
    ): Response<T> {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} [${LogLevels.INFO}] [${context}]: ${resMessage} => ${message}`)

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
    resMessage: string,
    context: string,
    errors?: any
    ): Response {
        const timestamp = new Date().toISOString();
        console.error(`${timestamp} [${LogLevels.ERROR}] [${context}]: ${resMessage} => ${message}`)
        return res.status(statusCode).send({
            success: false,
            message,
            errors: errors?.message
        });
    }
}