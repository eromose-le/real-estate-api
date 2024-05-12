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

    const { password: userPassword, ...userInfo } = newUser;
    res.status(201).json({
      message: "User created successfully",
      data: userInfo,
      success: !!userInfo,
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
      const isAdmin = true;

      const token = await authService.generateCookieToken(
        userExist?.id,
        SEVEN_DAYS,
        isAdmin
      );
      const { password: userPassword, ...userInfo } = userExist;

      res
        .cookie("token", token, {
          httpOnly: true, // Only client-side js access
          // ...(EnvKeys.isProduction() && { secure: true }), // Only https access
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

export const logout = asyncHandler(async (req: Request, res: Response) => {
  return res.clearCookie("token").status(200).json({
    message: "Logout Successful",
    data: null,
    success: true,
  });
});
