import { DeepPartial } from "typeorm";
import { Category } from "../../databases/postgresql/entities/Category";
import { Product } from "../../databases/postgresql/entities/Product";
import { Request } from "express";

export interface BodyResponse<T> {
  httpStatusCode: number;
  data: T;
}
export interface ProductsResponse {
  products: Product[];
}
export interface CategoryResponse {
  category: Category[];
}

class PublicService {
  async findAllProducts() {
    return await Product.find();
  }
  async findProductById(id: number) {
    const product = await Product.findOne({ where: { id } });
    return product;
  }
  async findCategory() {
    const category = await Category.find();
    return category;
  }
  async findProductByCategoryId(categoryId: number) {
    const productId = await Product.find({ where: { categoryId } });
    return productId;
  }
  async createProduct(req: Request) {
    console.log(process.env.CLOUDINARY_NAME);
    const { name, price, description, categoryId } = req.body as Product;
    const imgPath = req.file?.path;
    console.log(imgPath);
    const newProduct = await Product.create({
      name,
      price,
      description,
      imgUrl: imgPath,
      categoryId,
    } as DeepPartial<Product>).save();
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
    return await productDelete.remove();
  }
}
export default new PublicService();
