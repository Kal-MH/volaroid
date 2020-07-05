import express from "express";
import routes from "../routes";
import {
  userProfile,
  getEditProfile,
  postEditProfile,
  postChangePassword,
  getMe,
} from "../Controller/userController";
import { uploadProfile, onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.userDetail(), userProfile);
userRouter.get(routes.me, onlyPrivate, userProfile);

userRouter.get(routes.userEdit(), onlyPrivate, getEditProfile);
userRouter.post(routes.userEdit(), uploadProfile, postEditProfile);

userRouter.post(routes.userChangePassword, postChangePassword);

export default userRouter;
