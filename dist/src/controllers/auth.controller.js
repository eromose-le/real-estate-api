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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const authService = new auth_service_1.AuthService();
const userService = new user_service_1.UserService();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log({ username, email, password });
    try {
        const hashedPassword = yield authService.hashPassword(password);
        const newUser = yield authService.register({
            username,
            email,
            password: hashedPassword,
        });
        console.log("[CONTROLLER]", hashedPassword);
        console.log("[CONTROLLER]", newUser);
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occured" });
    }
});
exports.register = register;
