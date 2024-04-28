import { Router } from "express";
import {
  GetVerifyEmailTokenMiddleWare,
  // GetVerifyEmailTokenMiddleWare,
  LoginMiddleware,
  RegisterMiddleware,
} from "../../middlewares/user.middleware";
import userController from "./publicController";
import uploadCloud from "../../utils/upload";
export const UseRouter = Router();
UseRouter.get("/all", userController.getAllUser);
UseRouter.post("/register", RegisterMiddleware, userController.Register);
UseRouter.post("/login", LoginMiddleware, userController.Login);
UseRouter.post(
  "/verify-email",
  GetVerifyEmailTokenMiddleWare,
  userController.verifyEmail
);

UseRouter.put(
  "/updateUser/:id",
  uploadCloud.single("imgUrl"),
  userController.UpdateUser
);
UseRouter.delete("/deleteUser/:id", userController.DeleteUser);
