import { NextFunction } from "express";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import prisma from "../lib/prisma";
import { ErrorResponse } from "../utils/errorResponse";
import { UpdateUserResponse, UpdateUserParams } from "types/user.types";

const userFilter = {
  id: true,
  email: true,
  username: true,
  avatar: true,
  createdAt: true,
};

export class UserService {
  async getUserByUsername(_username: string, _next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: _username },
      });

      if (user) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.USER_EXISTS_WITH_USERNAME,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return user;
    } catch (err) {
      return _next(err);
    }
  }

  async getUserByEmail(_email: string, _next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: _email },
      });

      if (user) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.USER_EXISTS_WITH_EMAIL,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return user;
    } catch (err) {
      return _next(err);
    }
  }

  async getUsers(_next: NextFunction): Promise<any | void> {
    try {
      const users = await prisma.user.findMany({
        select: { ...userFilter },
      });

      if (!users) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.USER_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return users;
    } catch (err) {
      return _next(err);
    }
  }

  async getUser(
    { ...dto }: { id: string },
    _next: NextFunction
  ): Promise<any | void> {
    const { id: _id } = dto;

    try {
      const user = await prisma.user.findUnique({
        where: { id: _id },
        select: { ...userFilter },
      });

      if (!user) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.USER_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return user;
    } catch (err) {
      return _next(err);
    }
  }

  async update(
    { ...dto }: UpdateUserParams,
    _next: NextFunction
  ): Promise<UpdateUserResponse | void> {
    const { id: _id, payload: _payload } = dto;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: _id },
        data: {
          ..._payload?.inputs,
          ...(_payload?.updatedPassword && {
            password: _payload?.updatedPassword,
          }),
          ...(_payload?.avatar && { avatar: _payload?.avatar }),
        },
      });

      if (!updatedUser) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.PROFILE_UPDATE_FAILED,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      const { password: userPassword, ...rest } = updatedUser;

      return rest;
    } catch (err) {
      return _next(err);
    }
  }

  async delete(
    { ...dto }: { id: string },
    _next: NextFunction
  ): Promise<any | void> {
    const { id: _id } = dto;

    try {
      await this.getUser({ id: _id }, _next);
      await prisma.user.delete({
        where: { id: _id },
      });

      return null;
    } catch (err) {
      return _next(
        new ErrorResponse(
          ERROR_MESSAGES.USER_DELETE_FAILED,
          HTTP_STATUS_CODE[400].code
        )
      );
    }
  }
}
