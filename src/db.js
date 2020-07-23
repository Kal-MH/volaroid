import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  process.env.PRODUCTION
    ? process.env.MONGO_URL_PRODUCTION
    : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
const handleSuccess = () => console.log("Connected to db");
const handleError = () => console.log("Error occurs DB");

db.once("open", handleSuccess);
db.on("error", handleError);
