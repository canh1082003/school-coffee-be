import { NextFunction, Request, Response } from "express";

import { Product } from "../../../databases/postgresql/entities/Product";
import privateservice from "./privateservice";
import { ResponseCustom } from "../../../utils/expressCustom";

class PrivateController {
  async postCreateProduct(
    req: Request,
    res: ResponseCustom,
    next: NextFunction
  ) {
    try {
      const newProduct = await privateservice.createProduct(req);

      return res.status(201).json({
        httpStatusCode: 201,
        data: { newProduct },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async putUpdateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const updateProducts = await privateservice.updateProduct(
        Number(id),
        updatedData
      );
      return res.status(200).json({
        httpStatusCode: 200,
        // data: updateProducts,
        message: "Update Success",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async GetDeleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteProduct = await privateservice.deleteProduct(Number(id));
      return res.status(200).json({
        httpStatusCode: 200,
        message: "Delete Success bíu ti phun day",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
export default new PrivateController();
