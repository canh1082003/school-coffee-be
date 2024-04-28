import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Index("orderId", ["orderId"], {})
@Index("productId", ["productId"], {})
@Entity("orderitem", { schema: "coffee" })
export class Orderitem extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "orderId", unsigned: true })
  orderId: number;

  @Column("int", { name: "productId", unsigned: true })
  productId: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderitems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderId", referencedColumnName: "orderId" }])
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderitems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}
