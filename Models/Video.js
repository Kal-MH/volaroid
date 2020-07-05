import mongoose from "mongoose";
import { NULL } from "node-sass";

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required.",
  },
  description: String,
  src: {
    type: String,
    required: "File URL is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const model = mongoose.model("Video", VideoSchema);
export default model;
