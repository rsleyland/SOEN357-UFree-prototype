import express from "express";
import { createNewFriendship, getMyFriendships, removeFriendship } from "../controllers/friendship.controllers.js";
import { userRoute } from "../middlewares/userAccess.middleware.js";
const FriendshipRouter = express.Router();

FriendshipRouter.get('/my', userRoute, getMyFriendships);
FriendshipRouter.post('/create', userRoute, createNewFriendship);
FriendshipRouter.delete('/remove', userRoute, removeFriendship);

export { FriendshipRouter };