import { Router } from "express";
import StripeController from "./stripeController";

export const OrderRouter = Router();
OrderRouter.post("/create", StripeController.Order);
OrderRouter.get("/all", StripeController.getallOrder);
OrderRouter.get("/:userId", StripeController.getOrderUserId);
OrderRouter.put("/updateSuccess/:orderId", StripeController.UpdateOrderSuccess);
OrderRouter.put("/updateFailed/:orderId", StripeController.UpdateOrderFailed);
OrderRouter.get(
  "/:orderId/orderitems",
  StripeController.getOrderItemsByOrderId
);
