import express from "express";
import { getMySchedule, saveMySchedule } from "../controllers/schedule.controllers.js"
import { userRoute } from "../middlewares/userAccess.middleware.js";
const ScheduleRouter = express.Router();

ScheduleRouter.get('/my', userRoute, getMySchedule);
ScheduleRouter.post('/save', userRoute, saveMySchedule);

export { ScheduleRouter };