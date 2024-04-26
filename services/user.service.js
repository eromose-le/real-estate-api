import prisma from "../lib/prisma.js";

export class UserService {
  async register({ username, email, password }) {
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
      res.status(500).json({ message: "Failed to create user!" });
    }
  }
}
