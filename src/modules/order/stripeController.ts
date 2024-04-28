import { NextFunction, Request } from "express";
import { ResponseCustom } from "../../utils/expressCustom";
import Stripe from "stripe";
import { HttpStatusCode } from "../../utils/httpStatusCode";
import OrderService from "./orderService";
import { Orderitem } from "../../databases/postgresql/entities/Orderitem";
import orderService from "./orderService";
import orderController from "./orderController";
import { PaymentMethod, PaymentStatus, Status } from "./type";
import { BadRequestErr } from "../../exception/bad-request-error";

class StripeController {
  async Order(req: Request, res: ResponseCustom, next: NextFunction) {
    const stripe = new Stripe(
      "sk_test_51OpNr4ImfBh2ftnXMFiB1hBYk2rYA49gzxeeBwxMsxJCfWueBxb7DyX6sAaz5tNUUgv8YuWTy3GoTUFUNzmLWktb00xglVuXKL"
    );
    try {
      const { cartItems, paymentMethod } = req.body;
      const orderItemStripe = await orderController.StripeOrder(
        cartItems as Orderitem[]
      );
      const { userId } = req.body;
      switch ((paymentMethod as string).toLowerCase()) {
        case PaymentMethod.CASH: {
          const order = await orderController.createOrder(
            userId,
            cartItems,
            PaymentMethod.CASH,
            PaymentStatus.PENDING
          );
          const orderId = order.orderDetails.orderId;
          console.log(orderId);
          const cashUrl = `http://localhost:5000/Success/${orderId}`;
          return res.json({
            httpStatusCode: HttpStatusCode.OK,
            data: { url: cashUrl },
          });
        }

        case PaymentMethod.ONLINE: {
          const order = await orderController.createOrder(
            userId,
            cartItems,
            PaymentMethod.ONLINE,
            PaymentStatus.ONLINE_PENDING
          );
          const orderId = order.orderDetails.orderId;
          const session = await stripe.checkout.sessions.create({
            line_items: orderItemStripe,
            mode: "payment",
            success_url: `http://localhost:5000/Success/${orderId}`,
            cancel_url: `http://localhost:4000/order/failed/:id`,
          });
          return res.json({
            httpStatusCode: HttpStatusCode.OK,
            data: { url: session.url },
          });
        }

        default:
          throw new BadRequestErr({
            errorCode: "INVALID_PAYMENT_METHOD",
            errorMessage: "Invalid payment method",
          });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async UpdateOrderSuccess(
    req: Request,
    res: ResponseCustom,
    next: NextFunction
  ) {
    try {
      const orderId = req.params.orderId;
      const updateDate = req.body;
      const order = await OrderService.updateOrder(Number(orderId), updateDate);

      return res.json({
        httpStatusCode: HttpStatusCode.OK,
        data: order,
      });
    } catch (error) {
      console.error("Error updating order payment status:", error);
      next(error);
    }
  }
  async UpdateOrderFailed(
    req: Request,
    res: ResponseCustom,
    next: NextFunction
  ) {
    try {
      const orderId = req.params.orderId;
      const updateDate = req.body;
      const order = await OrderService.updateOrderFailed(
        Number(orderId),
        updateDate
      );

      return res.json({
        httpStatusCode: HttpStatusCode.OK,
        data: order,
      });
    } catch (error) {
      console.error("Error updating order payment status:", error);
      next(error);
    }
  }
  async getallOrder(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const order = await OrderService.AllOrder();
      return res.json({
        httpStatusCode: HttpStatusCode.OK,
        data: order,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getOrderUserId(req: Request, res: ResponseCustom, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const orders = await OrderService.getOrderUserId(Number(userId));
      return res.json({
        httpStatusCode: HttpStatusCode.OK,
        data: orders,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getOrderItemsByOrderId(
    req: Request,
    res: ResponseCustom,
    next: NextFunction
  ) {
    try {
      const orderId = req.params.orderId;
      const orderItems = await orderService.orderItemOfId(Number(orderId));
      // console.log(orderItems);
      if (!orderItems || orderItems.length === 0) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          httpStatusCode: HttpStatusCode.NOT_FOUND,
          data: "Order items not found",
        });
      }
      return res.json({
        httpStatusCode: HttpStatusCode.OK,
        data: orderItems,
      });
    } catch (error) {
      console.error("Error fetching order items by orderId:", error);
      next(error);
    }
  }
}

export default new StripeController();
