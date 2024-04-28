import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { EnvKeys } from "../common/EnvKeys";

export class AuthService {
  async hashPassword(_password: string): Promise<string> {
    try {
      return await bcrypt.hash(_password, 10);
    } catch (err: any) {
      return err;
    }
  }

  async generateCookieToken(
    _userId: string,
    _expireTime: number
  ): Promise<string> {
    try {
      const secret = EnvKeys.JWT_SECRET;

      // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")

      const token = jwt.sign(
        {
          id: _userId,
          isAdmin: false,
        },
        secret,
        { expiresIn: _expireTime }
      );

      return token;
    } catch (err: any) {
      return err;
    }
  }

  async validatedUsername(_username: string, _next: any) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: _username },
      });

      if (!user) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.INVALID_CREDENTIALS,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return user;
    } catch (err: any) {
      return _next(err);
    }
  }

  async comparePassword(_password: string, _userPassword: string, _next?: any) {
    try {
      const isPasswordValid = await bcrypt.compare(_password, _userPassword);

      if (!isPasswordValid) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.INVALID_CREDENTIALS,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return isPasswordValid;
    } catch (err: any) {
      return _next(err);
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
      return err;
    }
  }
}
