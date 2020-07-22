import routes from "./routes";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const multerImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "volaroid/profile",
  }),
});
export const uploadProfile = multerImage.single("profile");

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "volaroid/video",
  }),
});
export const uploadVideo = multerVideo.single("videoFile");

export const localMiddlewares = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
export const onlyPrivateAPI = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403);
    res.end();
  }
};
