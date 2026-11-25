import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.logInUser);
export default authRouter;
