import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("image_productid_foreign", ["productId"], {})
@Entity("image", { schema: "coffee" })
export class Image {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "productId", unsigned: true })
  productId: number;

  @Column("text", { name: "url" })
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}
