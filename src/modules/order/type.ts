export interface OrderItem {
  productId: number;
  quantity: number;
}
export interface OrderInfo {
  userId: number;
  currency: string;
  totalPrice: number;
  paymentMethod: string;
  createdAt: Date;
}
export enum PaymentMethod {
  CASH = "cash",
  ONLINE = "online",
}
export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  ONLINE_PENDING = "online-pending",
}
export enum Status {
  PENDING = "pending",
  FAILDED = "failed",
  DELIVERED = "delivered",
}
export enum OrderErrors {
  INVALID_PAYMENT_METHOD = 20004,
}
//ONLINE
//nếu user thành toán online=> paymentStatus = Success
// nhưng Status vẫn là pending
//phải chờ shipper xác nhận thành công thì Status của user => Success

//CASH
//paymentStatus và Status là pending
// chờ shipper xác nhận thành công thì update paymentStatus và Status là success

//Về shipper thì chỉ gọi Status = pending thôi
