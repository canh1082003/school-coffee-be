import { Order } from "../../databases/postgresql/entities/Order";
import { Orderitem } from "../../databases/postgresql/entities/Orderitem";
import { Product } from "../../databases/postgresql/entities/Product";
import { BadRequestErr } from "../../exception/bad-request-error";

class OrderSerVice {
  async updateOrder(orderId: number, updateDate: Partial<Order>) {
    const orderUpdate = await Order.findOne({ where: { orderId } });
    if (!orderUpdate) {
      throw new Error("OrderId not found");
    }

    orderUpdate.paymentStatus = "paid";
    orderUpdate.status = "delivered";
    Object.assign(orderUpdate, updateDate);
    await orderUpdate.save();
    return orderUpdate;
  }
  async updateOrderFailed(orderId: number, updateDate: Partial<Order>) {
    const orderUpdate = await Order.findOne({ where: { orderId } });
    if (!orderUpdate) {
      throw new Error("OrderId not found");
    }

    orderUpdate.paymentStatus = "failed";
    orderUpdate.status = "failed";
    Object.assign(orderUpdate, updateDate);
    await orderUpdate.save();
    return orderUpdate;
  }
  async AllOrder() {
    return await Order.find({ relations: ["orderitems"] });
  }
  async getOrderUserId(userId: number) {
    return await Order.find({ where: { userId: userId } });
  }
  async orderItemOfId(orderId: number) {
    const orderItems = await Orderitem.find({ where: { orderId: orderId } });
    console.log(orderItems);
    const productNamesPromises = orderItems.map(async (orderItem) => {
      const productId = orderItem.productId;
      const products = await Product.find({ where: { id: productId } });
      console.log(productId);
      if (products && products.length > 0) {
        return products[0].name;
      }
      return null;
    });

    const productNames = await Promise.all(productNamesPromises);

    return productNames.filter((name) => name !== null);
  }
}

export default new OrderSerVice();
