import express from "express";
import routes from "../routes";
import {
  home,
  getJoin,
  getLogin,
  getSearch,
  postLogin,
  postJoin,
} from "../Controller/globalController";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(
  routes.join,
  postJoin,
  passport.authenticate("local-join"),
  postLogin
);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.search, getSearch);

export default globalRouter;
