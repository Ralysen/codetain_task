import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User} from "../entity";
import { ResponseUtils } from "../middleware";
import { validate } from "class-validator";
import QueryCreator from "../middleware/query-creator";

export class UserController {
    async getAllUsers(req: Request, res: Response): Promise<Response> {
        const alias = "user";
        const userRepo = AppDataSource.getRepository(User);
        const queryBuilder = userRepo.createQueryBuilder(alias);
        const response = QueryCreator.createQuery(req, queryBuilder, alias);
        return ResponseUtils.sendResponse(
            res,
            response,
            200
        );
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const userRepo = AppDataSource.getRepository(User);
        let user;
        try {
            user = await userRepo.findOneByOrFail({
                id: id
            })
        } catch (error) {
            return ResponseUtils.sendError(
                res,
                "Can't find user with specific id",
                404
            )
        }
        return ResponseUtils.sendResponse(
            res,
            user,
            200
        );
    }

    async createNewUser(req: Request, res: Response): Promise<Response> {
        const { name, password } = req.body;
        const userRepo = AppDataSource.getRepository(User);
        const user = new User();
        user.name = name;
        user.password = password;
        const errors = await validate(user);

        if( errors.length>0 ) {
            return ResponseUtils.sendError(
                res,
                "Bad request.",
                400,
                errors
            );
        }

        user.hashPassword();

        try{
            await userRepo.save(user);
        } catch (error) {
            return ResponseUtils.sendError(
                res,
                "User already in use",
                409
            );
        }
        return ResponseUtils.sendResponse(
            res,
            user
        );
    }

    async updateUser (req: Request, res: Response):Promise<Response> {
        const { id } = req.params;
        const { name } = req.body;
        const userRepo = AppDataSource.getRepository(User);
        let user;

        try{
            user = await userRepo.findOneByOrFail({
                id: id
            });
        } catch (error) {
            return ResponseUtils.sendError(
                res,
                `Can't find user with id: ${id}`,
                404,
                error
            );
        }

        user.name = name
        const errors = await validate(user);

        if(errors.length > 0) {
            return ResponseUtils.sendError(
                res,
                "Bad request",
                400,
                errors
            );
        }

        try {
            await userRepo.save(user);
        } catch (error) {
            return ResponseUtils.sendError(
                res,
                "Name already exist. Choose another",
                400,
                errors
            )
        }
        return ResponseUtils.sendResponse(
            res,
            user,
            200
        );
    }

    async deleteUser (req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const userRepo = AppDataSource.getRepository(User);
        let userToRemove;
        try{
            userToRemove = await userRepo.findOneByOrFail({
                id: id
            })
        } catch (error) {
            return ResponseUtils.sendError(
                res,
                "Can't find user with specific id",
                404
            );
        }

        await userRepo.remove(userToRemove);

        return ResponseUtils.sendResponse(
            res,
            "User removed successfully"
        );
    }
}