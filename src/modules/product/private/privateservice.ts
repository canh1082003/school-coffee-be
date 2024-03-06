import { Product } from "../../../databases/postgresql/entities/Product";
import { NextFunction, Request, Response } from "express";

export interface BodyResponse<T> {
  httpStatusCode: number;
  data: T;
}
export interface ProductsResponse {
  products: Product[];
}
class PrivateService {
  async createProduct(req: Request) {
    const { name, price, description, categoryId } = req.body as Product;
    const imgPath = req.file?.path;
    const newProduct = await Product.create({
      name,
      price,
      description,
      img: imgPath,
      categoryId,
    });
    await newProduct.save();
    return newProduct;
  }
  async updateProduct(id: number, updatedData: Partial<Product>) {
    const productUpdate = await Product.findOne({ where: { id } });
    if (!productUpdate) {
      throw new Error("Product not found");
    }
    Object.assign(productUpdate, updatedData);
    await productUpdate.save();
    return productUpdate;
  }
  async deleteProduct(id: number) {
    const productDelete = await Product.findOne({ where: { id } });
    if (!productDelete) {
      throw new Error("Product not found");
    }
    await productDelete.remove();
    return productDelete;
  }
}
export default new PrivateService();
