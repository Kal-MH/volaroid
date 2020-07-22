import Video from "../Models/Video";
import Comment from "../Models/Comment";

export const apiLikes = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById({ _id: id });
    const likeVideos = req.user.likeVideos;

    let filteredVideo = likeVideos.filter((v) => v._id != video.id);

    if (filteredVideo.length === likeVideos.length) {
      video.likes += 1;
      video.save();
      req.user.likeVideos.push(video.id);
      req.user.save();
      res.status(200);
    } else {
      video.likes -= 1;
      video.save();
      req.user.likeVideos = filteredVideo;
      req.user.save();
      res.status(400);
    }
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const apiTitle = async (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  try {
    const video = await Video.findById({ _id: id });
    video.title = title;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const apiDescription = async (req, res) => {
  const {
    params: { id },
    body: { description },
  } = req;
  try {
    const video = await Video.findById({ _id: id });
    video.description = description;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const apiCommentCreate = async (req, res) => {
  const {
    params: { id },
    body: { text },
  } = req;
  try {
    const video = await Video.findById({ _id: id });
    const newComment = await Comment.create({
      text,
      creator: req.user._id,
      video: id,
    });
    video.comments.push(newComment.id);
    video.save();
    console.log(newComment);
    console.log(video);
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const apiCommentEdit = async (req, res) => {
  const {
    params: { id },
    body: { comment, curComment },
  } = req;
  try {
    const commentOne = await Comment.findOne({ text: curComment });
    if (commentOne.video == id) {
      commentOne.text = comment;
      commentOne.save();
    }
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const apiCommentDelete = async (req, res) => {
  const {
    params: { id },
    body: { curComment },
  } = req;
  try {
    const video = await Video.findById({ _id: id });
    const commentOne = await Comment.findOne({ text: curComment });
    if (commentOne.video != id || commentOne.user != req.user_id) {
      throw Error();
    } else {
      let comments = video.comments.filter(
        (comment) => comment._id != commentOne.id
      );
      video.comments = comments;
      video.save();
      await Comment.findOneAndRemove({ text: curComment });
    }
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};
