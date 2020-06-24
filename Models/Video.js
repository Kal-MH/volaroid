import mongoose from "mongoose";

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
  views: Number,
});

const model = mongoose.model("Video", VideoSchema);
export default model;
