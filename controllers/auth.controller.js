import { AuthService } from "../services/auth.service.js";
import { UserService } from "../services/user.service.js";

const authService = new AuthService();
const userService = new UserService();

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await authService.hashPassword(password);
    const newUser = await userService.register({
      username,
      email,
      password: hashedPassword,
    });

    console.log("[CONTROLLER]", hashedPassword);
    console.log("[CONTROLLER]", newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occured" });
  }
  // return await authService.register(req, res);
};
