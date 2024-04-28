import { ERROR_MESSAGES } from "../constants";
import prisma from "../lib/prisma";

export class UserService {
  async getUserByUsername(_username: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: _username },
      });

      if (!user)
        throw new Error(ERROR_MESSAGES.USER_EXISTS_WITH_EMAIL_OR_USERNAME);

      return user;
    } catch (err: any) {
      return err;
    }
  }
}
