import { Router } from "express";
import {
  LoginMiddleware,
  RegisterMiddleware,
} from "../../middlewares/user.middleware";
import userController from "../use/public/publicController";
export const UseRouter = Router();
UseRouter.get("/all", userController.getAllUser);
UseRouter.post("/register", RegisterMiddleware, userController.Register);
UseRouter.post("/login", LoginMiddleware, userController.Login);
UseRouter.put("/updateUser/:id", userController.UpdateUser);
UseRouter.delete("/deleteUser/:id", userController.DeleteUser);
