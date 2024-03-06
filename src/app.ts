import express, { Application } from "express";
import cors from "cors";
import { NotFoundErr } from "./exception/notFound-err";
import AuthErrorCode from "./utils/authErrorCode";
import config from "./utils/config";
import errorHandler from "./middlewares/errorHandler";
import mysqlDatabase from "./databases/coffeeProduction";
import { router } from "./router/router";

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routers();
    this.errorHandle();
  }
  private middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private routers() {
    this.app.use("/api/coffee", router);
    this.app.use("*", () => {
      throw new NotFoundErr({
        errorCode: AuthErrorCode.NOT_FOUND,
        errorMessage: "Not Found",
      });
    });
  }
  private errorHandle() {
    this.app.use(errorHandler);
  }
  public async listen() {
    const PORT = config.portServer;
    const HOST = config.getHost;
    mysqlDatabase.connect();
    this.app.listen(PORT, () => {
      console.log(`Server running at ${HOST}: ${PORT}`);
    });
  }
}
export default new App();
