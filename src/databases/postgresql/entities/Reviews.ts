import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index("reviews_productid_foreign", ["productId"], {})
@Entity("reviews", { schema: "coffee" })
export class Reviews {
  @PrimaryGeneratedColumn({ type: "int", name: "userId", unsigned: true })
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
