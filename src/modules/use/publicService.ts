import { DeepPartial } from "typeorm";
import { User } from "../../databases/postgresql/entities/User";
import { BadRequestErr } from "../../exception/bad-request-error";
import AuthErrorCode from "../../utils/authErrorCode";
import { Hashing } from "../../utils/hashing";
import { randomBytes } from "crypto";
import { request } from "express";
class UserService {
  async findUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }
  async findUserById(id: number) {
    return await User.findOne({ where: { id } });
  }
  async findAllUser() {
    return await User.find();
  }
  async findAndVerifyUser(verifyEmailToken: string) {
    const user = await User.findOne({ where: { verifyEmailToken } });
    if (!user)
      throw new BadRequestErr({
        errorCode: AuthErrorCode.INVALID_VERIFY_EMAIL_TOKEN,
        errorMessage: `Not found any user with token ${verifyEmailToken}`,
      });
    if (user.isVerifyEmail)
      throw new BadRequestErr({
        errorCode: AuthErrorCode.INVALID_VERIFY_EMAIL_TOKEN,
        errorMessage: "Email verify already",
      });
    if (user.verifyEmailToken !== verifyEmailToken) {
      throw new BadRequestErr({
        errorCode: AuthErrorCode.INVALID_VERIFY_EMAIL_TOKEN,
        errorMessage: "Invalid token",
      });
    }

    user.isVerifyEmail = true;
    return await user.save();
  }
  async deleteUser(id: number) {
    const userDelete = await User.findOne({ where: { id } });
    await userDelete?.remove();
    return userDelete;
  }
  async updateUser(id: number, updatedData: Partial<User>) {
    const userUpdate = await User.findOne({ where: { id } });
    if (!userUpdate) {
      throw new Error("User not found");
    }

    Object.assign(userUpdate, updatedData);
    await userUpdate.save();
    return userUpdate;
  }
  async registerUser(userData: Partial<User>) {
    if (!userData.password) {
      throw new Error("Password is required");
    }
    const { firstName, lastName, email } = userData;
    const verifyEmailToken = randomBytes(8).toString("hex");
    const imgPath = request.file?.path;
    const hashedPassword = await Hashing.toHash(userData.password);
    const newUser = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verifyEmailToken,
      role: "user",
      imgUrl: imgPath || null,
    } as DeepPartial<User>).save();
    return newUser;
  }
}
export default new UserService();
