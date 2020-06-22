import express from "express";
import routes from "../routes";
import { userProfile } from "../Controller/userController";

const userRouter = express.Router();

userRouter.get(routes.userDetail(), userProfile);
userRouter.get(routes.me, userProfile);

export default userRouter;
