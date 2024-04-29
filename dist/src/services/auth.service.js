"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const EnvKeys_1 = require("../common/EnvKeys");
class AuthService {
    hashPassword(_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.hash(_password, 10);
            }
            catch (err) {
                return err;
            }
        });
    }
    generateCookieToken(_userId, _expireTime) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = EnvKeys_1.EnvKeys.JWT_SECRET;
                // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
                const token = jsonwebtoken_1.default.sign({
                    id: _userId,
                    isAdmin: false,
                }, secret, { expiresIn: _expireTime });
                return token;
            }
            catch (err) {
                return err;
            }
        });
    }
    validatedUsername(_username, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: { username: _username },
                });
                if (!user) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return user;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    comparePassword(_password, _userPassword, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPasswordValid = yield bcrypt_1.default.compare(_password, _userPassword);
                if (!isPasswordValid) {
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS, constants_1.HTTP_STATUS_CODE[400].code));
                }
                return isPasswordValid;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
    register(_a, _next_1) {
        return __awaiter(this, arguments, void 0, function* ({ username, email, password }, _next) {
            try {
                const userExist = yield this.validatedUsername(username, _next);
                if (userExist)
                    return _next(new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.USER_EXISTS_WITH_EMAIL_OR_USERNAME, constants_1.HTTP_STATUS_CODE[400].code));
                const newUser = yield prisma_1.default.user.create({
                    data: {
                        username,
                        email,
                        password,
                    },
                });
                return newUser;
            }
            catch (err) {
                return _next(err);
            }
        });
    }
}
exports.AuthService = AuthService;
