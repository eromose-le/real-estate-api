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
exports.verifyToken = void 0;
const EnvKeys_1 = require("../common/EnvKeys");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ message: "Not Authenticated!" });
    const secret = EnvKeys_1.EnvKeys.JWT_SECRET;
    jsonwebtoken_1.default.verify(token, secret, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(403).json({ message: "Token is not Valid!" });
        req.userId = payload.id;
        next();
    }));
};
exports.verifyToken = verifyToken;
