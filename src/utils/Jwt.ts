import jwt from "jsonwebtoken";
import { userInfo } from "./expressCustom";
import config from "./config";
class JwtHandler {
  verifyAccessToken(accessToken: string) {
   const payload =  jwt.verify(accessToken, config.JWTSecretKey);
   return payload as userInfo
  }
}
export default new JwtHandler()