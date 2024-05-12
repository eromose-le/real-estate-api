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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const async_js_1 = require("../middleware/async.js");
const user_service_js_1 = require("../services/user.service.js");
const auth_service_js_1 = require("../services/auth.service.js");
const constants_js_1 = require("../constants.js");
const authService = new auth_service_js_1.AuthService();
const userService = new user_service_js_1.UserService();
exports.getUsers = (0, async_js_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService.getUsers(next);
    res.status(200).json({
        message: "Fetch users successfully",
        data: users,
        success: !!users,
    });
}));
exports.getUser = (0, async_js_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userService.getUser({ id }, next);
    res.status(200).json({
        message: "Fetch user successfully",
        data: user,
        success: !!user,
    });
}));
exports.updateUser = (0, async_js_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const _a = req.body, { password, avatar } = _a, inputs = __rest(_a, ["password", "avatar"]);
    if (id !== tokenUserId) {
        return res.status(403).json({
            error: constants_js_1.ERROR_MESSAGES.NOT_AUTHORIZED,
            success: false,
            statusCode: constants_js_1.HTTP_STATUS_CODE[403],
        });
    }
    let updatedPassword = null;
    if (password) {
        updatedPassword = yield authService.hashPassword(password);
    }
    const payload = Object.assign(Object.assign(Object.assign({}, inputs), (updatedPassword && { password: updatedPassword })), (avatar && { avatar }));
    const updatedUser = yield userService.update({ id, payload }, next);
    res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
        success: !!updatedUser,
    });
}));
exports.deleteUser = (0, async_js_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tokenUserId = req.userId;
    if (id !== tokenUserId) {
        return res.status(403).json({
            error: constants_js_1.ERROR_MESSAGES.NOT_AUTHORIZED,
            success: false,
            statusCode: constants_js_1.HTTP_STATUS_CODE[403],
        });
    }
    yield userService.delete({ id }, next);
    res.status(200).json({
        message: "User deleted successfully",
        data: null,
        success: true,
    });
}));
// export const savePost = asyncHandler(async (req, res) => {
//   const postId = req.body.postId;
//   const tokenUserId = req.userId;
//   try {
//     const savedPost = await prisma.savedPost.findUnique({
//       where: {
//         userId_postId: {
//           userId: tokenUserId,
//           postId,
//         },
//       },
//     });
//     if (savedPost) {
//       await prisma.savedPost.delete({
//         where: {
//           id: savedPost.id,
//         },
//       });
//       res.status(200).json({ message: "Post removed from saved list" });
//     } else {
//       await prisma.savedPost.create({
//         data: {
//           userId: tokenUserId,
//           postId,
//         },
//       });
//       res.status(200).json({ message: "Post saved" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to delete users!" });
//   }
// });
// export const profilePosts = asyncHandler(async (req, res) => {
//   const tokenUserId = req.userId;
//   try {
//     const userPosts = await prisma.post.findMany({
//       where: { userId: tokenUserId },
//     });
//     const saved = await prisma.savedPost.findMany({
//       where: { userId: tokenUserId },
//       include: {
//         post: true,
//       },
//     });
//     const savedPosts = saved.map((item) => item.post);
//     res.status(200).json({ userPosts, savedPosts });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to get profile posts!" });
//   }
// });
// export const getNotificationNumber = asyncHandler(async (req, res) => {
//   const tokenUserId = req.userId;
//   try {
//     const number = await prisma.chat.count({
//       where: {
//         userIDs: {
//           hasSome: [tokenUserId],
//         },
//         NOT: {
//           seenBy: {
//             hasSome: [tokenUserId],
//           },
//         },
//       },
//     });
//     res.status(200).json(number);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to get profile posts!" });
//   }
// });
