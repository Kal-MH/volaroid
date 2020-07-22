import express from "express";
import routes from "../routes";
import {
  home,
  getJoin,
  getLogin,
  getSearch,
  postLogin,
  postJoin,
  logout,
} from "../Controller/globalController";
import passport from "passport";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(
  routes.join,
  postJoin,
  passport.authenticate("local-join"),
  postLogin
);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.github, passport.authenticate("github"));
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: routes.join,
    successRedirect: routes.home,
  })
);
globalRouter.get(routes.naver, passport.authenticate("naver"));
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect: routes.join,
    successRedirect: routes.home,
  })
);

globalRouter.get(routes.search, getSearch);

globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
