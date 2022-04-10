import express from "express";
import 'dotenv/config';
import './db_connect.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import path from 'path';
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'https://soen357-ufree.herokuapp.com', credentials: true}));
app.use(express.static(path.join(__dirname, "frontend", "build")));

import { AuthRouter } from './routes/auth.routes.js';
import { ScheduleRouter } from "./routes/schedule.routes.js";
import { FriendshipRouter } from "./routes/friendship.routes.js";

app.use("/auth", AuthRouter);
app.use("/schedule", ScheduleRouter);
app.use("/friendship", FriendshipRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
