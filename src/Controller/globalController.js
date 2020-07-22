import User from "../Models/User";
import Video from "../Models/Video";
import passport from "passport";
import routes from "../routes";

export const getLikeVideos = (videos, likeVideos) => {
  const resultVideos = [];
  videos.forEach((video) => {
    let i;
    for (i = 0; i < likeVideos.length; i++) {
      if (video.id == likeVideos[i]) {
        const v = {
          video,
          likeOnset: 1,
        };
        resultVideos.push(v);
        break;
      }
    }
    if (i === likeVideos.length) {
      const v = {
        video,
        likeOnset: 0,
      };
      resultVideos.push(v);
    }
  });
  return resultVideos;
};

export const home = async (req, res) => {
  let videos;
  try {
    videos = await Video.find({}).populate("creator").sort({ createdAt: -1 });
    if (req.user) {
      videos = getLikeVideos(videos, req.user.likeVideos);
    } else {
      videos = getLikeVideos(videos, ["000"]);
    }
  } catch (error) {
    console.log(error);
  }
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

export const getSearch = async (req, res) => {
  const {
    query: { term },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: term, $options: "i" },
    }).populate("creator");
  } catch (error) {
    console.log(error);
  }
  res.render("searchPage", { title: "Search", term, videos });
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
