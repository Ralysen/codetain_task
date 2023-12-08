import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import { NextFunction, Request, Response } from "express";
import { ResponseUtils } from "./response-utils";

    export const TokenHandler = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        let token = req.headers['authorization'] as string;
        //token = token.split(" ")[1];
        let jwtPayload;

        if(!token) {
            return ResponseUtils.sendError(
                res,
                "Unauthorized",
                401
            );
        }

        try {
            jwtPayload = jwt.verify(token, config.jwtSecret) as any;
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            return ResponseUtils.sendError(
                res,
                "Invalid Token - Unauthorized",
                401,
                error
            );
        }

        const { id, name } = jwtPayload;
        const newToken = jwt.sign(
            {id, name},
            config.jwtSecret,
            { expiresIn: "120s"}
        );
        res.setHeader("token", newToken);
        next();
}
