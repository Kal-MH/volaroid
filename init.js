import app from "./app";
import "./db";
import "./Models/Video";
import "./Models/User";
import "./Models/Comment";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`localhost:${PORT} -> Listening`);

app.listen(PORT, handleListening);
