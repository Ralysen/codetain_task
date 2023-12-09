import { AuthController } from "../controllers";
import express from "express";
import { TokenHandler } from "../middleware/token-handler";

const authController = new AuthController();
const router = express.Router();

router.post("/login", authController.login);
router.post('/change-password', [TokenHandler], authController.changePassword);

export default router;