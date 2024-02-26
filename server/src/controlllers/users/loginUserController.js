import selectUserByEmail from "../../models/users/selectUserByEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "../../service/errorService.js";

const loginUserController = (req, res, next) => {
  const { email, password } = req.body;

  selectUserByEmail(email, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return invalidCredentialsError();
    }

    bcrypt.compare(password, user.password, (error, validPassword) => {
      if (error) {
        return next(error);
      }

      if (!validPassword) {
        return invalidCredentialsError();
      }

      const tokenInfo = {
        id: user.id,
      };
      const token = jwt.sign(tokenInfo, process.env.SECRET, {
        expiresIn: "10d",
      });

      res.send({
        status: "ok",
        data: {
          token: token,
          id: user.id,
        },
      });
    });
  });
};

export default loginUserController;