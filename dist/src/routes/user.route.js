"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("../controllers/user.controller.js");
const verifyToken_js_1 = require("../middleware/verifyToken.js");
const router = express_1.default.Router();
router.get("/", user_controller_js_1.getUsers);
router.get("/search/:id", verifyToken_js_1.verifyToken, user_controller_js_1.getUser);
router.put("/:id", verifyToken_js_1.verifyToken, user_controller_js_1.updateUser);
router.delete("/:id", verifyToken_js_1.verifyToken, user_controller_js_1.deleteUser);
// router.post("/save", verifyToken, savePost);
// router.get("/profilePosts", verifyToken, profilePosts);
// router.get("/notification", verifyToken, getNotificationNumber);
exports.default = router;
