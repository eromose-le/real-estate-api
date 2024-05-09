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
exports.shouldBeAdmin = exports.shouldBeLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const async_1 = require("../middleware/async");
const EnvKeys_1 = require("../common/EnvKeys");
const constants_1 = require("../constants");
exports.shouldBeLoggedIn = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.userId);
    res.status(200).json({ message: "You are Authenticated" });
}));
exports.shouldBeAdmin = (0, async_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({
            error: constants_1.ERROR_MESSAGES.NOT_AUTHENTICATED,
            success: false,
            statusCode: constants_1.HTTP_STATUS_CODE[401],
        });
    const secret = EnvKeys_1.EnvKeys.JWT_SECRET;
    jsonwebtoken_1.default.verify(token, secret, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({
                error: constants_1.ERROR_MESSAGES.TOKEN_EXPIRED,
                success: false,
                statusCode: constants_1.HTTP_STATUS_CODE[403],
            });
        }
        if (!(payload === null || payload === void 0 ? void 0 : payload.isAdmin)) {
            return res.status(403).json({
                error: constants_1.ERROR_MESSAGES.NOT_AUTHORIZED,
                success: false,
                statusCode: constants_1.HTTP_STATUS_CODE[403],
            });
        }
    }));
    res.status(200).json({ message: "Hey Admin!, you are Authenticated" });
}));
