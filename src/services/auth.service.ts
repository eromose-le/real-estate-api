import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

export class AuthService {
  async hashPassword(_password: string): Promise<string> {
    try {
      return await bcrypt.hash(_password, 10);
    } catch (err: any) {
      return err;
    }
  }

  async register({ username, email, password }: RegisterUserDto) {
    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });

      return newUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
