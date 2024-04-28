import { NextFunction, Response, Request } from "express";
import { User } from "../../databases/postgresql/entities/User";
import { BadRequestErr } from "../../exception/bad-request-error";
import AuthErrorCode from "../../utils/authErrorCode";
import userService from "./publicService";
import { validationResult } from "express-validator";
import "express-async-errors";
import { ResponseCustom, userInfo } from "../../utils/expressCustom";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import { Unauthorized } from "../../exception/unauthorized-error";
import { RequestValidationError } from "../../exception/request-validation-error";
import { Hashing } from "../../utils/hashing";
import { sendEmail } from "../../utils/mail";
import publicService from "./publicService";
interface UserDto extends User {
  confirmPassword: string;
}
class UserController {
  async Register(req: Request, res: ResponseCustom, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        req.body as UserDto;
      if (password !== confirmPassword) {
        throw new BadRequestErr({
          errorCode: AuthErrorCode.NOT_MATCH,
          errorMessage: "Password not match",
        });
      }
      const userExists = await userService.findUserByEmail(email);
      if (userExists) {
        throw new BadRequestErr({
          errorCode: AuthErrorCode.EXISTS_USER,
          errorMessage: "User already exists",
        });
      }
      const user = await userService.registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      await sendEmail({
        email,
        subject: "Verify email",
        message: `Your verify token is ${user.verifyEmailToken} `,
      });
      return res.status(HttpStatusCode.CREATED).json({
        httpStatusCode: HttpStatusCode.CREATED,
        data: { email: user.email },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async Login(req: Request, res: ResponseCustom, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    try {
      const { email, password } = req.body as UserDto;
      const user = await userService.findUserByEmail(email);
      if (!user) {
        throw new Unauthorized({
          errorCode: AuthErrorCode.INVALID_EMAIL,
          errorMessage: "Not found any account with this email",
        });
      }
      const isPasswordMatch = await Hashing.compare(user.password, password);
      if (!isPasswordMatch) {
        throw new Unauthorized({
          errorCode: AuthErrorCode.WRONG_PASSWORD,
          errorMessage: "Wrong password",
        });
      }
      return res.json({
        httpStatusCode: HttpStatusCode.OK,
        data: {
          email: user.email,
          fullName: `${user.firstName} ${user.lastName}`,
          userId: user.id,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    try {
      const { verifyEmailToken } = req.body;
      await publicService.findAndVerifyUser(verifyEmailToken);
      return res
        .status(HttpStatusCode.OK)
        .json({ message: "Verified successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getAllUser(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    try {
      const user = await userService.findAllUser();
      return res.status(HttpStatusCode.OK).json({
        data: user,
        message: "get All Success",
      });
    } catch (error) {
      next(error);
    }
  }
  async DeleteUser(req: Request, res: ResponseCustom, next: NextFunction) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(Number(id));
      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data: "Delete Success",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async UpdateUser(req: Request, res: ResponseCustom, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedUser = await userService.updateUser(Number(id), updatedData);
      return res.json({
        httpStatusCode: HttpStatusCode.OK,
        data: { updatedUser },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
