import express from "express";
import routes from "../routes";
import {
  userProfile,
  getEditProfile,
  postEditProfile,
  postChangePassword,
  getMe,
} from "../Controller/userController";
import { uploadProfile } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.userDetail(), userProfile);
userRouter.get(routes.me, userProfile);

userRouter.get(routes.userEdit(), getEditProfile);
userRouter.post(routes.userEdit(), uploadProfile, postEditProfile);

userRouter.post(routes.userChangePassword, postChangePassword);

export default userRouter;
