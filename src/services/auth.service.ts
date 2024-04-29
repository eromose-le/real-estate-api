import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { EnvKeys } from "../common/EnvKeys";
import { RegisterUserDto } from "types/auth.types";

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

  async validatedUsername(_username: string, _next: NextFunction) {
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
    } catch (err) {
      return _next(err);
    }
  }

  async validatedEmail(_email: string, _next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: _email },
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
    } catch (err) {
      return _next(err);
    }
  }

  async comparePassword(
    _password: string,
    _userPassword: string,
    _next: NextFunction
  ) {
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
    } catch (err) {
      return _next(err);
    }
  }

  async canRegister(
    _payload: {
      email: string;
      username: string;
    },
    _next: NextFunction
  ): Promise<boolean | void> {
    try {
      const [username, email] = await Promise.all([
        this.validatedUsername(_payload.username, _next),
        this.validatedEmail(_payload.email, _next),
      ]);

      if (!!username || !!email) {
        return !(!!username && !!email);
      }

      return true;
    } catch (err) {
      return _next(err);
    }
  }

  async register(
    { username, email, password }: RegisterUserDto,
    _next: NextFunction
  ) {
    try {
      const payload = { username, email };
      const canRegister = await this.canRegister({ ...payload }, _next);

      if (!canRegister)
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.USER_EXISTS_WITH_EMAIL_OR_USERNAME,
            HTTP_STATUS_CODE[400].code
          )
        );

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });

      return newUser;
    } catch (err) {
      return _next(err);
    }
  }
}
