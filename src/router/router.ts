import { Router } from "express";
import { ProductRouter } from "../modules/product";
import { UseRouter } from "../modules/use";
import { OrderRouter } from "../modules/order";

export const router = Router();
router.use("/product", ProductRouter);
router.use("/user", UseRouter);
router.use("/order", OrderRouter);
