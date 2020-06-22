import express from "express";
import routes from "./routes";
import globalRouter from "./Router/globalRouter";
import { localMiddlewares } from "./middlewares";
import videoRouter from "./Router/videoRouter";
import userRouter from "./Router/userRouter";

const app = express();
const PORT = 4000;

const handleListening = () => console.log(`localhost:${PORT} -> Listening`);

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/static", express.static("static"));
app.use(localMiddlewares);
app.use(routes.home, globalRouter);
app.use(routes.video, videoRouter);
app.use(routes.user, userRouter);

app.listen(PORT, handleListening);
