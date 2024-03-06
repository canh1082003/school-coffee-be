import path from "path";
import { DataSource } from "typeorm";
import config from "../utils/config";
import { Category } from "./postgresql/entities/Category";
import { Product } from "./postgresql/entities/Product";
import { Reviews } from "./postgresql/entities/Reviews";
import { Image } from "./postgresql/entities/Image";
import { User } from "./postgresql/entities/User";

class MysqlDatabase {
  connection: DataSource;
  dataSource = new DataSource({
    ...config.mysqlConfig,
    entities: [Category, Image, Product, Reviews, User],
  });
  async connect(): Promise<DataSource> {
    try {
      this.connection = await this.dataSource.initialize();
      console.log("Mysql Database Migration Successfully!");
      return this.connection;
    } catch (error) {
      console.log(`Mysql Database Migration Error: ${error}`);
      process.exit(1);
    }
  }
}

const mysqlDatabase = new MysqlDatabase();

export default mysqlDatabase;
