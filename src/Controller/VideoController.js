import Video from "../Models/Video";
import Comment from "../Models/Comment";
import User from "../Models/User";
import routes from "../routes";

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  let userOnset = 0;
  let likeOnset = 0;
  try {
    const video = await Video.findById({ _id: id }).populate("creator");
    const comments = [];
    for (let i = 0; i < video.comments.length; i++) {
      const comment = await Comment.findById({
        _id: video.comments[i],
      }).populate("creator");
      comments.push(comment);
    }
    video.views += 1;
    video.save();
    if (req.user && req.user._id == video.creator.id) userOnset = 1;
    if (req.user) {
      for (let i = 0; i < req.user.likeVideos.length; i++) {
        if (req.user.likeVideos[i] == video.id) {
          likeOnset = 1;
          break;
        }
      }
    }
    res.render("videoDetail", {
      title: "Video Detail",
      video,
      user: video.creator,
      comments,
      userOnset,
      likeOnset,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getUpload = (req, res) => {
  res.render("videoUpload", { title: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file,
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      src: file.location,
      creator: req.user._id,
    });
    console.log(newVideo);
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (error) {
    console.log(error);
    res.render("videoUpload", { title: "Upload" });
  }
};

export const getDelete = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const creator = await User.findById({ _id: req.user._id });
    const video = await Video.findById({ _id: id });

    if (video.creator != creator.id) {
      throw Error();
    } else {
      let videos = creator.videos.filter((v) => v._id != video.id);
      creator.videos = videos;
      creator.save();

      for (let i = 0; i < video.comments.length; i++) {
        await Comment.findByIdAndRemove({ _id: video.comments[i] });
      }

      await Video.findByIdAndRemove({ _id: id });
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.videoDetail(id));
  }
};
