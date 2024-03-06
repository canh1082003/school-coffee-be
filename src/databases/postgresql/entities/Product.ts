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
import { Image } from "./Image";
import { Category } from "./Category";
import { Reviews } from "./Reviews";

@Index("product_categoryid_foreign", ["categoryId"], {})
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

  @Column("text", { name: "img" })
  img: string;

  @Column("int", { name: "categoryId", unsigned: true })
  categoryId: number;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;

  @OneToMany(() => Reviews, (reviews) => reviews.product)
  reviews: Reviews[];
}
