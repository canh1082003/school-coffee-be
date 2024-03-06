import { Router } from "express";
import publiccontroller from "../../modules/product/public/publicController";
import privatecontroller from "../product/private/privatecontroller";
import uploadCloud from "../../utils/upload";

export const ProductRouter = Router();
ProductRouter.get("/all", publiccontroller.getAllProduct);
ProductRouter.get("/category", publiccontroller.getCategory);
ProductRouter.get("/:categoryId", publiccontroller.getProductCategoryId);

ProductRouter.post(
  "/createProduct",
  uploadCloud.single("img"),
  privatecontroller.postCreateProduct
);
ProductRouter.put("/updateProduct/:id", privatecontroller.putUpdateProduct);
ProductRouter.delete("/deleteProduct/:id", privatecontroller.GetDeleteProduct);
