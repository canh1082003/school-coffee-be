import { Router } from "express";
import publiccontroller from "../../modules/product/publicController";
import uploadCloud from "../../utils/upload";

export const ProductRouter = Router();
ProductRouter.get("/all", publiccontroller.getAllProduct);
ProductRouter.get("/category", publiccontroller.getCategory);
ProductRouter.get(
  "/category/:categoryId",
  publiccontroller.getProductCategoryId
);
ProductRouter.get("/:id", publiccontroller.getProductById);

ProductRouter.post(
  "/createProduct",
  uploadCloud.single("imgUrl"),
  publiccontroller.postCreateProduct
);
ProductRouter.put("/updateProduct/:id", publiccontroller.putUpdateProduct);
ProductRouter.delete("/deleteProduct/:id", publiccontroller.GetDeleteProduct);
