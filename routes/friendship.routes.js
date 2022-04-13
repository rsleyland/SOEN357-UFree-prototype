import express from "express";
import { createNewFriendship, getMyFriendships, removeFriendship, refreshFriendshipCode } from "../controllers/friendship.controllers.js";
import { userRoute } from "../middlewares/userAccess.middleware.js";
const FriendshipRouter = express.Router();

// Friendship routes
FriendshipRouter.get('/my', userRoute, getMyFriendships);
FriendshipRouter.post('/create', userRoute, createNewFriendship);
FriendshipRouter.delete('/remove', userRoute, removeFriendship);
FriendshipRouter.get('/refreshcode', userRoute, refreshFriendshipCode);

export { FriendshipRouter };