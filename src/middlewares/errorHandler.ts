import { NextFunction, Request, Response } from "express";
import { ErrorCustom } from "../exception/ErrorCustom";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { ResponseCustom } from "../utils/expressCustom";
import AuthErrorCode from "../utils/authErrorCode";

export const errorHandler = (
  err: Error,
  req: Request,
  res: ResponseCustom,
  next: NextFunction
) => {
  if (err instanceof ErrorCustom) {
    console.log(err);
    return res.status(err.statusCode).json({
      httpStatusCode: err.statusCode,
      errors: err.serializeError(),
    });
  }
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    errors: {
      errorCode: AuthErrorCode.SERVER_INTERNAL_ERROR,
      errorMessage: "Server internal Error",
    },
  });
};

export default errorHandler;
