import { User } from "../../../databases/postgresql/entities/User";
import { Hashing } from "../../../utils/hashing";

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
    const hashedPassword = await Hashing.toHash(userData.password);
    const newUser = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();
    return newUser;
  }
}
export default new UserService();
