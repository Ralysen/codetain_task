import { Request, Response } from "express";
import { User } from "../entity";
import { ResponseUtils } from "../middleware";
import { AppDataSource } from "../database/data-source";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { validate } from "class-validator";
import { ResponseCodes } from "../support/enums";
import { ResponseMessages } from "../support/objects/responseMessages";

export class AuthController {
    async login(req: Request, res: Response): Promise<Response> {
        const logContext = "auth-controller.ts -> login()";
        try {
            const { name, password } = req.body;

            if (!name || !password) {
                return ResponseUtils.sendError(res, "Name and password are required", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
            }

            const userRepository = AppDataSource.getRepository(User);
            let user: User;

            try {
                user = await userRepository.findOneOrFail({ where: { name } });
            } catch (error) {
                return ResponseUtils.sendError(res, "Can't find a user with specified name", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
            }

            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                return ResponseUtils.sendError(res, "Incorrect password", ResponseCodes.UNAUTHORIZED, ResponseMessages[ResponseCodes.UNAUTHORIZED], logContext);
            }

            const token = jwt.sign(
                { id: user.id, name: user.name },
                config.jwtSecret,
                { expiresIn: "120s" }
            );

            return ResponseUtils.sendResponse(res, "Login successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], "AuthController.login()", {token: token});

        } catch (error) {
            return ResponseUtils.sendError(res, "Login failed", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, {error: error});
        }
    }

    async changePassword(req: Request, res: Response): Promise<Response> {
        const id = res.locals.jwtPayload.id;
        const { oldPassword, newPassword } = req.body;
        const userRepo = AppDataSource.getRepository(User);
        const logContext = "auth-controller.ts -> changePassword()";

        if (!oldPassword || !newPassword) {
            return ResponseUtils.sendError(res, "You need to provide old and new password", ResponseCodes.UNAUTHORIZED, ResponseMessages[ResponseCodes.UNAUTHORIZED], logContext);
        }

        let user: User;

        try {
            user = await userRepo.findOneByOrFail({ id: id });
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't find user with specified id", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
        }

        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            return ResponseUtils.sendError(res, "Invalid old password", ResponseCodes.UNAUTHORIZED, ResponseMessages[ResponseCodes.UNAUTHORIZED], logContext);
        }

        user.password = newPassword;
        const errors = await validate(user);

        if (errors.length > 0) {
            return ResponseUtils.sendError(res, "", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
        }

        user.hashPassword();
        await userRepo.save(user);

        return ResponseUtils.sendResponse(res, "Password changed successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], "AuthController.changePassword()");
    }
}
