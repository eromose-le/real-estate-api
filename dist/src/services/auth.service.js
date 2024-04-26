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
    register(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, email, password }) {
            try {
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
                console.log(err);
                return err;
            }
        });
    }
}
exports.AuthService = AuthService;
