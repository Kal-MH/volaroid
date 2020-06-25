import express from "express";
import routes from "../routes";
import {
  videoDetail,
  getUpload,
  postUpload,
} from "../Controller/VideoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
