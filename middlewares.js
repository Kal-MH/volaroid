import routes from "./routes";
import multer from "multer";

export const localMiddlewares = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

const multerImage = multer({ dest: "uploads/images/" });
export const uploadProfile = multerImage.single("profile");

const multerVideo = multer({ dest: "uploads/videos/" });
export const uploadVideo = multerVideo.single("videoFile");
