import express from "express";
import routes from "../routes";
import {
  home,
  getJoin,
  getLogin,
  getSearch,
} from "../Controller/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

//join-> getJoin, postJoin
globalRouter.get(routes.join, getJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.get(routes.search, getSearch);

export default globalRouter;
