import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL_PRODUCTION, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const handleSuccess = () => console.log("Connected to db");
const handleError = () => console.log("Error occurs DB");

db.once("open", handleSuccess);
db.on("error", handleError);

export const videos = [
  {
    id: 11,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    creator: {
      id: 222,
      name: "Benjamin",
      profile: "https://source.unsplash.com/random",
    },
    title: "Title",
    description: "description",
    views: 23,
  },
];

export const user = {
  id: 222,
  profile: "https://source.unsplash.com/random",
  name: "Benjamin",
  videos: [
    {
      id: 11,
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Title",
      description: "description",
      views: 23,
    },
  ],
};
