import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { LoginUserDto, RegisterUserDto } from "../types/auth.types";
import { asyncHandler } from "../middleware/async";

const authService = new AuthService();
const userService = new UserService();

export const register = asyncHandler(
  async (req: { body: RegisterUserDto }, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const hashedPassword: string = await authService.hashPassword(password);
    const newUser = await authService.register(
      {
        username,
        email,
        password: hashedPassword,
      },
      next
    );
    if (!newUser) return;

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      success: !!newUser,
    });
  }
);

export const login = asyncHandler(
  async (req: { body: LoginUserDto }, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

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
          success: !!userInfo,
        });
    }
  }
);

export const logout = (req: Request, res: Response) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout Successful" });
};
