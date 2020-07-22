import express from "express";
import routes from "./routes";
import globalRouter from "./Router/globalRouter";
import videoRouter from "./Router/videoRouter";
import userRouter from "./Router/userRouter";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddlewares } from "./middlewares";
import passport from "passport";
import "./passport";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRouter from "./Router/apiRouter";
import path from "path";
dotenv.config();

const app = express();

const CookieStore = MongoStore(session);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: "false",
    saveUninitialized: "false",
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddlewares);

app.use(routes.home, globalRouter);
app.use(routes.video, videoRouter);
app.use(routes.user, userRouter);
app.use(routes.api, apiRouter);

export default app;
