import { validationResult } from "express-validator";
import { NextFunction, Request } from "express";
import PublicService, { BodyResponse } from "../product/publicService";

import { Product } from "../../databases/postgresql/entities/Product";
// import { RequestValidationError } from "../exception/request-validation-error";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import { Category } from "../../databases/postgresql/entities/Category";
import { BadRequestErr } from "../../exception/bad-request-error";
import AuthErrorCode from "../../utils/authErrorCode";
import { ResponseCustom } from "../../utils/expressCustom";

class PublicController {
  async getAllProduct(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const products = await PublicService.findAllProducts();

      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data: products,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async getProductById(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const id = req.params.id;
      const product = await PublicService.findProductById(Number(id));
      if (!product) {
        throw new BadRequestErr({
          errorCode: AuthErrorCode.NOT_FOUND,
          errorMessage: "Not Found",
        });
      }
      const response: BodyResponse<Product> = {
        httpStatusCode: HttpStatusCode.OK,
        data: product,
      };
      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getCategory(req: Request, res: ResponseCustom, next: NextFunction) {
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
  async getProductCategoryId(
    req: Request,
    res: ResponseCustom,
    next: NextFunction
  ) {
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
  async postCreateProduct(
    req: Request,
    res: ResponseCustom,
    next: NextFunction
  ) {
    try {
      const newProduct = await PublicService.createProduct(req);
      return res.status(201).json({
        httpStatusCode: 201,
        data: { newProduct },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async putUpdateProduct(
    req: Request,
    res: ResponseCustom,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const updateProducts = await PublicService.updateProduct(
        Number(id),
        updatedData
      );
      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data: "update Success",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async GetDeleteProduct(
    req: Request,
    res: ResponseCustom,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const deleteProduct = await PublicService.deleteProduct(Number(id));
      return res.status(HttpStatusCode.OK).json({
        httpStatusCode: HttpStatusCode.OK,
        data: "Delete Success ",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
export default new PublicController();
