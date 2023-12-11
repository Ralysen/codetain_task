import {Request, Response} from 'express';
import {AppDataSource} from '../database/data-source';
import {User} from '../entity';
import {ResponseUtils} from '../middleware';
import {validate} from 'class-validator';
import QueryCreator from '../middleware/query-creator';
import {ResponseCodes} from "../support/enums";
import {ResponseMessages} from "../support/objects/responseMessages";

export class UserController {
    private userRepo = AppDataSource.getRepository(User);

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        const alias = 'user';
        const logContext = "user-controller.ts -> getAllUsers()";
        const queryBuilder = this.userRepo.createQueryBuilder(alias);
        try {
            const response = await QueryCreator.createQuery(req, queryBuilder, alias);
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, response);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't get users list", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, error);

        }

    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "user-controller.ts -> getUserById()";
        let user;

        try {
            user = await this.userRepo.findOneByOrFail({ id: id });
            return ResponseUtils.sendResponse(res, "", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, user);
        } catch (error) {
            return ResponseUtils.sendError(res, "", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);

        }
    }

    async createNewUser(req: Request, res: Response): Promise<Response> {
        const { name, password } = req.body;
        const logContext = "user-controller.ts -> createNewUser()";
        const user = new User();
        user.name = name;
        user.password = password;

        const errors = await validate(user);

        if (errors.length > 0) {
            return ResponseUtils.sendError(res, "", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
        }

        user.hashPassword();

        try {
            await this.userRepo.save(user);
            return ResponseUtils.sendResponse(res, "User created successfully", ResponseCodes.CREATED, ResponseMessages[ResponseCodes.CREATED], logContext, user);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't create user", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, error);

        }

    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "user-controller.ts -> updateUser()";
        const { name } = req.body;
        let user;

        try {
            user = await this.userRepo.findOneByOrFail({ id: id });
        } catch (error) {
            return ResponseUtils.sendError(res, "", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
        }

        user.name = name;
        const errors = await validate(user);

        if (errors.length > 0) {
            return ResponseUtils.sendError(res, "", ResponseCodes.BAD_REQUEST, ResponseMessages[ResponseCodes.BAD_REQUEST], logContext);
        }

        try {
            await this.userRepo.save(user);
            return ResponseUtils.sendResponse(res, "User updated successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext, user);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't update user with specified id", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, error);

        }


    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logContext = "user-controller.ts -> deleteUser()";
        let userToRemove;

        try {
            userToRemove = await this.userRepo.findOneByOrFail({ id: id });
        } catch (error) {
            return ResponseUtils.sendError(res, "", ResponseCodes.NOT_FOUND, ResponseMessages[ResponseCodes.NOT_FOUND], logContext);
        }
        try{
            await this.userRepo.remove(userToRemove);
            return ResponseUtils.sendResponse(res, "User removed successfully", ResponseCodes.SUCCESS, ResponseMessages[ResponseCodes.SUCCESS], logContext);
        } catch (error) {
            return ResponseUtils.sendError(res, "Can't remove user with specified id", ResponseCodes.INTERNAL_SERVER_ERROR, ResponseMessages[ResponseCodes.INTERNAL_SERVER_ERROR], logContext, error);
        }

    }
}
