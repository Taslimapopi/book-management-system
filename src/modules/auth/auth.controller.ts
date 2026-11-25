import { type Request, type Response } from "express";
import { userService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.registerUserIntoDb(req.body);
    res.status(201).json({
      success: true,
      message: "register successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal srverError",
    });
  }
};

const logInUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.logInUserDb(req.body);
    res.status(201).json({
      success: true,
      message: "log in successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal srverError",
    });
  }
};

export const authController = {
  registerUser,
  logInUser,
};
