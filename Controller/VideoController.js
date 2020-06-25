import Video from "../Models/Video";
import routes from "../routes";

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  let userOnset = 0;
  try {
    const video = await Video.findById({ _id: id }).populate("creator");
    if (req.user && req.user._id == video.creator.id) userOnset = 1;
    res.render("videoDetail", {
      title: "Video Detail",
      video,
      user: video.creator,
      userOnset,
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
      src: file.path,
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
