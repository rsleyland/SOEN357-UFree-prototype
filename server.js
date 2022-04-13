import express from "express";
import 'dotenv/config';
import './db_connect.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));


//route imports
import { AuthRouter } from './routes/auth.routes.js';
import { ScheduleRouter } from "./routes/schedule.routes.js";
import { FriendshipRouter } from "./routes/friendship.routes.js";
// route setup
app.use("/auth", AuthRouter);
app.use("/schedule", ScheduleRouter);
app.use("/friendship", FriendshipRouter);

// Port and Listen (start server)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
