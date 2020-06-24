import routes from "./routes";
import { NULL } from "node-sass";

export const localMiddlewares = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};
