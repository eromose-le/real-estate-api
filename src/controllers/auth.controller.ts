import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

const authService = new AuthService();
const userService = new UserService();

export const register = async (
  req: { body: { username: any; email: any; password: any } },
  res: Response
) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword: string = await authService.hashPassword(password);
    const newUser = await authService.register({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occured" });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const userExist = await authService.validatedUsername(username, next);
    if (!userExist) return;

    const isPasswordValid = await authService.comparePassword(
      password,
      userExist?.password,
      next
    );

    if (!isPasswordValid) return;

    const isValid = !!userExist && isPasswordValid;
    if (!isValid) return;

    if (isValid) {
      const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
      const token = await authService.generateCookieToken(
        userExist?.id,
        SEVEN_DAYS
      );
      const { password: userPassword, ...userInfo } = userExist;

      res
        .cookie("token", token, {
          httpOnly: true, // Only client-side js access
          // ...(false && { secure: true }), // Only https access
          maxAge: SEVEN_DAYS,
        })
        .status(200)
        .json({
          message: "User login successfully",
          data: userInfo,
          success: true,
        });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
