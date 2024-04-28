import { Order } from "../../databases/postgresql/entities/Order";
import { Orderitem } from "../../databases/postgresql/entities/Orderitem";
import { Product } from "../../databases/postgresql/entities/Product";
import { BadRequestErr } from "../../exception/bad-request-error";
import { PaymentMethod, PaymentStatus, Status } from "./type";

class OrderController {
  StripeOrder = async (orderItems: Orderitem[]) => {
    if (!orderItems) {
      throw new Error("Invalid order items");
    }
    return await Promise.all(
      orderItems.map(async (item) => {
        const { productId, quantity } = item;
        const product = await Product.findOne({ where: { id: productId } });
        if (!product) {
          throw new BadRequestErr({
            errorCode: "1",
            errorMessage: "Can't not found product",
          });
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.imgUrl],
            },
            unit_amount: product.price * 100,
          },

          quantity,
        };
      })
    );
  };
  createOrderItem = async (
    order: Order,
    productId: number,
    quantity: number
  ) => {
    try {
      const product = await Product.findOne({ where: { id: productId } });
      if (!product) {
        throw new Error("Product not found");
      }
      const orderId = order.orderId;
      const orderItem = Orderitem.create({
        orderId: orderId,
        productId: productId,
        quantity: quantity,
      });
      console.log(orderItem);
      await orderItem.save();
      return orderItem;
    } catch (error) {
      console.error("Error creating order item:", error);
      throw error;
    }
  };

  async createOrder(
    userId: number,
    cartItems: Orderitem[],
    paymentMethod: PaymentMethod,
    paymentStatus: string
  ) {
    let totalPrice = 0;
    const orderItems: Orderitem[] = [];
    let order;

    for (const item of cartItems) {
      const { productId, quantity } = item;
      const product = await Product.findOne({ where: { id: productId } });
      if (!product) {
        throw new BadRequestErr({
          errorCode: "PRODUCT_NOT_FOUND",
          errorMessage: "Product not found",
        });
      }
      const productPrice = product.price;
      totalPrice += productPrice * quantity;
    }

    order = Order.create({
      userId: userId,
      paymentStatus,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      currency: "usd",
      deliveredAt: new Date(),
      createdAt: new Date(),
      status: Status.PENDING,
    });
    await order.save();

    for (const item of cartItems) {
      const createdOrderItem = await this.createOrderItem(
        order,
        item.productId,
        item.quantity
      );
      orderItems.push(createdOrderItem);
    }

    return {
      orderDetails: order,
      orderItems: orderItems,
      message: "Order placed successfully. Awaiting cash payment.",
    };
  }

  // update payment status/ role=shipper -> update payment status
}
export default new OrderController();
