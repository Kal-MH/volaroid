import User from "../Models/User";
import Video from "../Models/Video";
import routes from "../routes";
import { getLikeVideos } from "./globalController";

export const userProfile = async (req, res) => {
  let id;
  let videos;
  if (req.user) {
    id = req.user._id;
  } else {
    id = req.params.id;
  }
  try {
    const user = await User.findById({ _id: id }).populate("videos");
    //To check "liked", you use getLikeVideos.
    //If the video is checked(it means you like the video), heartIcon will be colored in pink.
    if (req.user) {
      videos = getLikeVideos(user.videos, req.user.likeVideos);
    } else {
      videos = getLikeVideos(user.videos, ["000"]);
    }
    let likeVideos = [];
    for (let i = 0; i < user.likeVideos.length; i++) {
      const likevideo = await Video.findById(user.likeVideos[i]).populate(
        "creator"
      );
      likeVideos.push(likevideo);
    }
    res.render("userProfile", {
      title: "Profile",
      user,
      videos,
      likeVideos: likeVideos.reverse(),
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => {
  const {
    params: { id },
  } = req;
  if (id != req.user._id) {
    res.redirect(routes.home);
  }
  res.render("editProfile", { title: "Edit Profile", user: req.user });
};
export const postEditProfile = async (req, res) => {
  const {
    body: { name },
    file,
    params: { id },
  } = req;
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { name, profile: file ? file.location : req.user.profile }
    );
    res.redirect(`/user${routes.me}`);
  } catch (error) {
    console.log(error);
    res.render("editProfile", { title: "Edit Profile", user: req.user });
  }
};

export const postChangePassword = async (req, res, next) => {
  const {
    body: { oldPassword, password, password1 },
  } = req;

  try {
    if (password === password1) {
      const user = await User.findById(req.user._id);
      user.comparePassword(oldPassword, (err, isMatch) => {
        if (err) {
          console.log(err);
          res.status(400);
          throw err;
        }
        console.log("password is match in controller.");
      });
      user.password = password;
      user.save((err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
      });
      res.redirect(`/user${routes.me}`);
    } else {
      res.status(400);
      throw err;
    }
  } catch (error) {
    console.log(error);
    res.render("editProfile", { title: "Edit Profile", user: req.user });
  }
};
