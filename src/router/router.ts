import { Router } from "express";
import { ProductRouter } from "../modules/product";
import { UseRouter } from "../modules/use";

export const router = Router();
router.use("/product", ProductRouter);
router.use("/user", UseRouter);
