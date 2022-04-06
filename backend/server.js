import express from "express";
import 'dotenv/config';
import './db_connect.js';
import cors from 'cors';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(morgan('dev'));

import { AuthRouter } from './routes/auth.routes.js';
import { ScheduleRouter } from "./routes/schedule.routes.js";
import { FriendshipRouter } from "./routes/friendship.routes.js";

app.use("/auth", AuthRouter);
app.use("/schedule", ScheduleRouter);
app.use("/friendship", FriendshipRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
