import { Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

const authService = new AuthService();
const userService = new UserService();

export const register = async (
  req: { body: { username: any; email: any; password: any } },
  res: Response
) => {
  const { username, email, password } = req.body;

  console.log({ username, email, password });
  try {
    const hashedPassword: string = await authService.hashPassword(password);
    const newUser = await authService.register({
      username,
      email,
      password: hashedPassword,
    });

    console.log("[CONTROLLER]", hashedPassword);
    console.log("[CONTROLLER]", newUser);

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occured" });
  }
};
