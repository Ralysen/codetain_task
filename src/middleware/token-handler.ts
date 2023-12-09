import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { NextFunction, Request, Response } from 'express';
import { ResponseUtils } from './response-utils';

export const TokenHandler = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'] as string;
    token = token.split(' ')[1];
    let jwtPayload;

    if (!token) {
        return ResponseUtils.sendError(res, 'Unauthorized', 401);
    }

    try {
        jwtPayload = jwt.decode(token) as any;

        if (!jwtPayload) {
            throw new Error();
        }

        const { id, name } = jwtPayload;

        if (Date.now() >= jwtPayload.exp * 1000) {
            token = jwt.sign({ id, name }, config.jwtSecret, { expiresIn: '120s' });
        }

        jwtPayload = jwt.verify(token, config.jwtSecret) as any;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return ResponseUtils.sendError(res, 'Error decoding/verifying token', 401, error);
    }

    res.setHeader('token', token);
    next();
};
