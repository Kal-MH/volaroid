import { videos } from "../db";
import User from "../Models/User";
import passport from "passport";
import routes from "../routes";

export const home = (req, res) => {
  console.log(req.user);
  console.log(res.locals.loggedUser);
  res.render("home", { title: "Home", videos });
};

export const getJoin = (req, res) => {
  res.render("join", { title: "Join" });
};
export const postJoin = (req, res, next) => {
  const {
    body: { email, name, password, password1 },
  } = req;
  if (password == password1) {
    next();
  } else {
    res.status(400);
    res.render("join", { title: "Join" });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { title: "Login" });
};
export const postLogin = passport.authenticate("local-login", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const getSearch = (req, res) => {
  res.render("searchPage", { title: "Search", videos });
};
