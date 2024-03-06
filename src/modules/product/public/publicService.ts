import { Category } from "../../../databases/postgresql/entities/Category";
import { Product } from "../../../databases/postgresql/entities/Product";
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
  async findAllProducts(offset: number, limit: number) {
    return await Product.findAndCount({
      skip: offset,
      take: limit,
    });
  }
  async findCategory() {
    const category = await Category.find();
    return category;
  }
  async findProductByCategoryId(categoryId: number) {
    const productId = await Product.find({ where: { categoryId } });
    return productId;
  }
}
export default new PublicService();
