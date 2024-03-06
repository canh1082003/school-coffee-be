import dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
dotenv.config();

class Config {
  private PORT = "PORT";
  private HOST = "HOST";
  private DB_NAME = "DB_NAME";
  private DB_PORT = "DB_PORT";
  private DB_TYPE="DB_TYPE";
  private DB_USERNAME="DB_USERNAME";
  private DB_PASSWORD="DB_PASSWORD"
  constructor() {
    if (
      !process.env[this.PORT] ||
      !process.env[this.HOST] ||
      !process.env[this.DB_NAME]||
      !process.env[this.DB_PORT]||
      !process.env[this.DB_USERNAME]||
      !process.env[this.DB_PASSWORD]
    )
      throw new Error("Please make sure your environment variable is all set");
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === "coffee";
  }
  get isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
  }
  get portServer(): number {
    return Number(process.env.PORT)!;
  }

  get getHost(): string {
    return process.env.HOST!;
  }

  get getDbName(): string {
    return process.env.DB_NAME!;
  }
  get getDbPort(): number {
    return Number(process.env.DB_PORT!)
  }

  get getDbType(): 'mysql' {
    return 'mysql'
  }

  get getDbUserName(): string {
    return process.env.DB_USERNAME!
  }
  get getDbPassword(): string {
    return process.env.DB_PASSWORD!
  }

  get mysqlConfig(): DataSourceOptions {
    return {
      host: this.getHost,
      port: this.getDbPort,
      username: this.getDbUserName,
      password: this.getDbPassword,
      database: this.getDbName,
      type: this.getDbType
    };
  }



}
export default new Config();
