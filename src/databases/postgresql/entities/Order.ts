import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Orderitem } from "./Orderitem";

@Index("userId", ["userId"], {})
@Entity("order", { schema: "coffee" })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "orderId", unsigned: true })
  orderId: number;

  @Column("int", { name: "userId", unsigned: true })
  userId: number;

  @Column("varchar", { name: "paymentStatus", length: 255 })
  paymentStatus: string;

  @Column("varchar", { name: "paymentMethod", length: 255 })
  paymentMethod: string;

  @Column("varchar", { name: "currency" })
  currency: string;

  @Column("int", { name: "totalPrice" })
  totalPrice: number;

  @Column("varchar", { name: "status", length: 255 })
  status: string;

  @Column("date", { name: "deliveredAt" })
  deliveredAt: Date;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;

  @OneToMany(() => Orderitem, (orderitem) => orderitem.order)
  orderitems: Orderitem[];
}
