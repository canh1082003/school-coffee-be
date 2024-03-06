import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import PublicService, { BodyResponse } from "../public/publicService";

import { Product } from "../../../databases/postgresql/entities/Product";
// import { RequestValidationError } from "../../exception/request-validation-error";
import { HttpStatusCode } from "../../../utils/httpStatusCode";
import { Category } from "../../../databases/postgresql/entities/Category";
import { BadRequestErr } from "../../../exception/bad-request-error";
import AuthErrorCode from "../../../utils/authErrorCode";

class PublicController {
  async getAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const [products, total] = await PublicService.findAllProducts(
        offset,
        Number(limit)
      );

      return res.status(HttpStatusCode.OK).json({
        data: products,
        total,
        page,
        limit,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await PublicService.findCategory();
      const response: BodyResponse<Category[]> = {
        httpStatusCode: HttpStatusCode.OK,
        data: category,
      };
      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getProductCategoryId(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.params.categoryId;
      const product = await PublicService.findProductByCategoryId(
        Number(categoryId)
      );
      if (!product) {
        throw new BadRequestErr({
          errorCode: AuthErrorCode.NOT_FOUND,
          errorMessage: "Not Found",
        });
      }
      const response: BodyResponse<Product[]> = {
        httpStatusCode: HttpStatusCode.OK,
        data: product,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
export default new PublicController();
