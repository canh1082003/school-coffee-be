import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index("productId", ["productId"], {})
@Entity("reviews", { schema: "coffee" })
export class Reviews {
  @Column("int", { primary: true, name: "userId", unsigned: true })
  userId: number;

  @Column("int", { name: "productId", unsigned: true })
  productId: number;

  @Column("varchar", { name: "comment", length: 255 })
  comment: string;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;

  @OneToOne(() => User, (user) => user.reviews, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
