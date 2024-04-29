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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const async_1 = require("../middleware/async");
const authService = new auth_service_1.AuthService();
const userService = new user_service_1.UserService();
exports.register = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = yield authService.hashPassword(password);
    const newUser = yield authService.register({
        username,
        email,
        password: hashedPassword,
    }, next);
    if (!newUser)
        return;
    const { password: userPassword } = newUser, userInfo = __rest(newUser, ["password"]);
    res.status(201).json({
        message: "User created successfully",
        data: userInfo,
        success: !!userInfo,
    });
}));
exports.login = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userExist = yield authService.validatedUsername(username, next);
    if (!userExist)
        return;
    const isPasswordValid = yield authService.comparePassword(password, userExist === null || userExist === void 0 ? void 0 : userExist.password, next);
    if (!isPasswordValid)
        return;
    const isValid = !!userExist && isPasswordValid;
    if (!isValid)
        return;
    if (isValid) {
        const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
        const token = yield authService.generateCookieToken(userExist === null || userExist === void 0 ? void 0 : userExist.id, SEVEN_DAYS);
        const { password: userPassword } = userExist, userInfo = __rest(userExist, ["password"]);
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
}));
const logout = (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json({ message: "Logout Successful" });
};
exports.logout = logout;
