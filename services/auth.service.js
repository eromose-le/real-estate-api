import bcrypt from "bcrypt";

export class AuthService {
  async hashPassword(_password) {
    try {
      return await bcrypt.hash(_password, 10);
    } catch (err) {
      return err;
    }
  }
}
