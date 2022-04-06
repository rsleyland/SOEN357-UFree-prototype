import express from "express";
import { getMySchedule, saveMySchedule, getFriendSchedule } from "../controllers/schedule.controllers.js"
import { userRoute } from "../middlewares/userAccess.middleware.js";
const ScheduleRouter = express.Router();

ScheduleRouter.get('/my', userRoute, getMySchedule);
ScheduleRouter.post('/friend', userRoute, getFriendSchedule);
ScheduleRouter.post('/save', userRoute, saveMySchedule);

export { ScheduleRouter };