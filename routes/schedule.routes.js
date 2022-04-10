import express from "express";
import { getMySchedule, saveMySchedule, getFriendSchedule, getFriendScheduleCompare } from "../controllers/schedule.controllers.js"
import { userRoute } from "../middlewares/userAccess.middleware.js";
const ScheduleRouter = express.Router();

ScheduleRouter.get('/my', userRoute, getMySchedule);
ScheduleRouter.post('/friend', userRoute, getFriendSchedule);
ScheduleRouter.post('/friend/compare', userRoute, getFriendScheduleCompare);
ScheduleRouter.post('/save', userRoute, saveMySchedule);

export { ScheduleRouter };