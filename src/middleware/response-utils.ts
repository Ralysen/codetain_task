import { Response } from "express";
import { LogLevels } from "../support/enums";


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
        if (message === "") {
            console.log(`${timestamp} [${LogLevels.INFO}] [${context}]: ${resMessage}`);
        } else {
            console.log(`${timestamp} [${LogLevels.INFO}] [${context}]: ${resMessage} => ${message}`);
        }

        return res.status(statusCode).send({
            success: true,
            message: "Success",
            data,
            metadata: {
                token: res.locals.token
            }
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
        if(message === "") {
            console.error(`${timestamp} [${LogLevels.ERROR}] [${context}]: ${resMessage}`);
        } else {
            console.error(`${timestamp} [${LogLevels.ERROR}] [${context}]: ${resMessage} => ${message}`);
        }
        if(res.locals.token) {
            return res.status(statusCode).send({
                success: false,
                message,
                errors: errors?.message,
                metadata: {
                    token: res.locals.token
                }
            });
        } else {
            return res.status(statusCode).send({
                success: false,
                message,
                errors: errors?.message
            });
        }
    }
}