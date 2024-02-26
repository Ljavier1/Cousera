import selectUserByEmail from "../../models/users/selectUserByEmail.js";
import updateUserAvatarModel from "../../models/users/updateUserAvatarModel.js";

import { deletePhotoService } from "../../service/photoService.js";

import { fileService } from "../../service/fileService.js";

const editUserAvatarController = (req, res, next) => {
  try {
    // console.log(req.files.avatar);
    selectUserByEmail(req.user.id, async (user) => {
      if (user.photo) await deletePhotoService(user.photo);

      const avatarName = await fileService(req.files.avatar, 100);

      await updateUserAvatarModel(avatarName, req.user.id);

      res.send({
        status: "ok",
        message: "Avatar actualizado",
      });
    });
  } catch (error) {
    next(error);
  }
};

export default editUserAvatarController;