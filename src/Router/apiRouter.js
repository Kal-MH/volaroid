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
import { onlyPrivateAPI } from "../middlewares";
const apiRouter = express.Router();

apiRouter.post(routes.apiLikes(), onlyPrivateAPI, apiLikes);
apiRouter.post(routes.apiTitle(), onlyPrivateAPI, apiTitle);
apiRouter.post(routes.apiDescription(), onlyPrivateAPI, apiDescription);
apiRouter.post(routes.apiCommentCreate(), onlyPrivateAPI, apiCommentCreate);
apiRouter.post(routes.apiCommentEdit(), onlyPrivateAPI, apiCommentEdit);
apiRouter.post(routes.apiCommentDelete(), onlyPrivateAPI, apiCommentDelete);

export default apiRouter;
