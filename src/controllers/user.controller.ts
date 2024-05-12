import { asyncHandler } from "../middleware/async.js";
import { UpdateUserDto } from "../types/user.types.js";
import { UserService } from "../services/user.service.js";
import { AuthService } from "../services/auth.service.js";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants.js";

const authService = new AuthService();
const userService = new UserService();

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userService.getUsers(next);
  res.status(200).json({
    message: "Fetch users successfully",
    data: users,
    success: !!users,
  });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const user = await userService.getUser({ id }, next);

  res.status(200).json({
    message: "Fetch user successfully",
    data: user,
    success: !!user,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body as UpdateUserDto;

  if (id !== tokenUserId) {
    return res.status(403).json({
      error: ERROR_MESSAGES.NOT_AUTHORIZED,
      success: false,
      statusCode: HTTP_STATUS_CODE[403],
    });
  }

  let updatedPassword = null;

  if (password) {
    updatedPassword = await authService.hashPassword(password);
  }

  const payload: Partial<UpdateUserDto> = {
    ...inputs,
    ...(updatedPassword && { password: updatedPassword }),
    ...(avatar && { avatar }),
  };

  const updatedUser = await userService.update({ id, payload }, next);

  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
    success: !!updatedUser,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({
      error: ERROR_MESSAGES.NOT_AUTHORIZED,
      success: false,
      statusCode: HTTP_STATUS_CODE[403],
    });
  }

  await userService.delete({ id }, next);

  res.status(200).json({
    message: "User deleted successfully",
    data: null,
    success: true,
  });
});

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
