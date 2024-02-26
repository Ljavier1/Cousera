import express from "express";

const router = express.Router();
import authUserController from "../middlewares/authUserController.js";

import userExistController from "../middlewares/userExistController.js";

import validation from "../middlewares/joiValidation.js";
import { registerSchema, logInSchema } from "../schemas/user/index.js";

import {
  newUserController,
  loginUserController,
  editUserAvatarController,
} from "../controlllers/users/index.js";

// USUARIO ANONIMO    //

// registrarte como usuario
router.post("/users/register", validation(registerSchema), newUserController);
// login usuario
router.post("/users/login", validation(logInSchema), loginUserController);

// cambiar avatar
router.post(
  "/users/avatar",
  authUserController,
  async (req, res, next) => {
    try {
      // Code using await for selectUserByEmail and other operations
      const user = await selectUserByEmail(req.user.id);
      if (user.photo) await deletePhotoService(user.photo);

      const avatarName = await fileService(req.files.avatar, 100);

      await updateUserAvatarModel(avatarName, req.user.id);

      res.send({
        status: "ok",
        message: "Avatar actualizado",
      });
    } catch (error) {
      next(error);
    }
  }
);

// perfil de usuario
router.get("/user/:userId", userExistController, getUserById);

export default router;
