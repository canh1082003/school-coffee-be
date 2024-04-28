import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Reviews } from "./Reviews";

@Entity("user", { schema: "coffee" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "firstName", length: 255 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 255 })
  lastName: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "verifyEmailToken", length: 255 })
  verifyEmailToken: string;

  @Column("tinyint", { name: "isVerifyEmail", default: 0 })
  isVerifyEmail: boolean;

  @Column("varchar", { name: "img_url", length: 255 })
  imgUrl: string;

  @Column("varchar", { name: "role", length: 255 })
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Reviews, (reviews) => reviews.user)
  reviews: Reviews;
}
