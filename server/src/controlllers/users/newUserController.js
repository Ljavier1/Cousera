import insertUserModel from "../../models/users/insertUserModel.js";

const newUserController = async (req, res, next) => {
  try {
    const { username, email, password, bio, photo } = req.body;
    console.log("Received data:", { username, email, password, bio, photo });
    await insertUserModel(username, email, password, bio, photo);
    res.send({
      status: "OK",
      message: "Usuario registrado",
    });
    next(); 
  } catch (error) {
    next(error);
  }
};

export default newUserController;