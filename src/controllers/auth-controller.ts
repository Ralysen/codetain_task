import { Request, Response } from "express";
import { User } from "../entity";
import { ResponseUtils } from "../middleware";
import { AppDataSource } from "../database/data-source";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { validate } from "class-validator";

export class AuthController {
    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { name, password } = req.body;

            if (!name || !password) {
                return ResponseUtils.sendError(res, "Name and password are required!", 400);
            }

            const userRepository = AppDataSource.getRepository(User);
            let user: User;

            try {
                user = await userRepository.findOneOrFail({ where: { name } });
            } catch (error) {
                return ResponseUtils.sendError(res, "Unauthorized", 401);
            }

            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                return ResponseUtils.sendError(res, "Unauthorized", 401);
            }

            const token = jwt.sign(
                { id: user.id, name: user.name },
                config.jwtSecret,
                { expiresIn: "120s" }
            );

            return ResponseUtils.sendResponse(res, token, 200);

        } catch (error) {
            return ResponseUtils.sendError(res, "Unauthorized", 401, error);
        }
    }

    async changePassword(req: Request, res: Response): Promise<Response> {
        const id = res.locals.jwtPayload.id;
        const { oldPassword, newPassword } = req.body;
        const userRepo = AppDataSource.getRepository(User);

        if (!oldPassword || !newPassword) {
            return ResponseUtils.sendError(res, "You need to provide old and new password", 400);
        }

        let user: User;

        try {
            user = await userRepo.findOneByOrFail({ id: id });
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find user with specified id", 401);
        }

        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            return ResponseUtils.sendError(res, "Invalid old password", 401);
        }

        user.password = newPassword;
        const errors = await validate(user);

        if (errors.length > 0) {
            return ResponseUtils.sendError(res, "Bad request", 400, errors);
        }

        user.hashPassword();
        await userRepo.save(user);

        return ResponseUtils.sendResponse(res, user, 200);
    }
}
