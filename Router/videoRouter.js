import express from "express";
import routes from "../routes";
import { videoDetail, getUpload } from "../Controller/VideoController";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
