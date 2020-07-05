import express from "express";
import routes from "../routes";
import {
  apiLikes,
  apiTitle,
  apiDescription,
  apiCommentCreate,
  apiCommentEdit,
  apiCommentDelete,
} from "../Controller/apiController";
import { onlyPrivate } from "../middlewares";
const apiRouter = express.Router();

apiRouter.post(routes.apiLikes(), onlyPrivate, apiLikes);
apiRouter.post(routes.apiTitle(), onlyPrivate, apiTitle);
apiRouter.post(routes.apiDescription(), onlyPrivate, apiDescription);
apiRouter.post(routes.apiCommentCreate(), onlyPrivate, apiCommentCreate);
apiRouter.post(routes.apiCommentEdit(), onlyPrivate, apiCommentEdit);
apiRouter.post(routes.apiCommentDelete(), onlyPrivate, apiCommentDelete);

export default apiRouter;
