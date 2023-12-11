import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import {NextFunction, Request, Response} from 'express';
import {ResponseUtils} from './response-utils';
import {ResponseCodes} from "../support/enums";
import {ResponseMessages} from "../support/objects/responseMessages";

export const TokenHandler = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'] as string;
    const logContext = "token-handler.ts -> TokenHandler()";

    if(!token) {
        return ResponseUtils.sendError(res, "You need to provide token to authorize", ResponseCodes.UNAUTHORIZED, ResponseMessages[ResponseCodes.UNAUTHORIZED], logContext);
    }
    token = token.split(' ')[1];
    let jwtPayload;

    if (!token) {
        return ResponseUtils.sendError(res, "You need to provide token to authorize", ResponseCodes.UNAUTHORIZED, ResponseMessages[ResponseCodes.UNAUTHORIZED], logContext);
    }

    try {
        jwtPayload = jwt.decode(token) as any;

        if (!jwtPayload) {
            throw new Error();
        }

        const { id, name } = jwtPayload;

        if (Date.now() - (jwtPayload.exp * 1000) >= 120000) {
            token = jwt.sign({ id, name }, config.jwtSecret, { expiresIn: '120s' });
            res.locals.token = token;
            return ResponseUtils.sendError(res, "Token expired", ResponseCodes.UNAUTHORIZED, ResponseMessages[ResponseCodes.UNAUTHORIZED], logContext)
        }

        jwtPayload = jwt.verify(token, config.jwtSecret) as any;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return ResponseUtils.sendError(res, "Invalid token", ResponseCodes.UNAUTHORIZED, ResponseMessages[ResponseCodes.UNAUTHORIZED], logContext);

    }
    res.locals.token = token;
    res.setHeader('token', token);
    next();
};
