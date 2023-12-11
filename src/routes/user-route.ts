import { UserController } from "../controllers";
import express from "express";
import { TokenHandler } from "../middleware/token-handler";

const userController = new UserController();
const router = express.Router();

router.get('/', [TokenHandler], userController.getAllUsers);
router.get('/:id', [TokenHandler], userController.getUserById);
router.post('/', userController.createNewUser);
router.put('/:id', [TokenHandler], userController.updateUser);
router.delete('/:id', [TokenHandler], userController.deleteUser);

export default router;