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
import { Orderitem } from "./Orderitem";
import { Category } from "./Category";
import { Reviews } from "./Reviews";

@Index("categoryId", ["categoryId"], {})
@Entity("product", { schema: "coffee" })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "price" })
  price: number;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("text", { name: "img_url" })
  imgUrl: string;

  @Column("int", { name: "categoryId", unsigned: true })
  categoryId: number;

  @OneToMany(() => Orderitem, (orderitem) => orderitem.product)
  orderitems: Orderitem[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;

  @OneToMany(() => Reviews, (reviews) => reviews.product)
  reviews: Reviews[];
}
