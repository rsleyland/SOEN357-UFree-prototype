import { Friendship } from "../models/Friendship.model.js";
import { User } from "../models/User.model.js";
import crypto from "crypto";

// Returns all friendships from user sending request. req.body.uid is updated by middleware with users id which is stored inside the token cookie from the request.
const getMyFriendships = async (req, res) => {
    try {
        const id = req.body.uid;
        const friendShips = await Friendship.find({$or: [{friend_1_id: id}, {friend_2_id: id}]});
        if (friendShips) {
            res.status(200).json(friendShips);  
        }
        else res.status(400).json("No Friendships found");  
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }
};

// Creates a new friendship between the user requesting and the user whom the friendship code belongs to 
const createNewFriendship = async (req, res) => {
    try {
        const id = req.body.uid;
        const name = req.body.name;
        const friendship_code = req.body.friendship_code;
        const friend = await User.findOne({friendship_code: friendship_code});
        if (friend) {
            if (friend._id.toString() == id) return res.status(400).json("That is your temporary code, please enter a friends temporary code to add them.");
            const friendsId = friend._id;
            const friendshipExists = await Friendship.findOne({$or: [{friend_1_id: id, friend_2_id: friendsId}, {friend_1_id: friendsId, friend_2_id: id}]});
            if (friendshipExists) return res.status(400).json("Friendship already exists");
            else {
                const friendship = await Friendship.create({
                    friend_1_id: id, friend_1_name: name, friend_2_id: friendsId, friend_2_name: `${friend.firstName} ${friend.lastName}`})
                if (friendship) { 
                    return res.status(200).json(friendship);
                }
                else return res.status(400).json("Friendship could not be created");
            }
        }
        else return res.status(400).json("Invalid code - Could not find friends account"); 
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }
};

// Removes the friendship between requesting user and the user belonging to passed friend_id
const removeFriendship = async (req, res) => {
    try {
        const id = req.body.uid;
        const friendsId = req.body.friend_id;
        const friendship = await Friendship.findOneAndDelete({$or: [{friend_1_id: id, friend_2_id: friendsId}, {friend_1_id: friendsId, friend_2_id: id}]})
        if (friendship) return res.status(200).json("Friendship removed");
        else return res.status(400).json("Could not find friendship"); 
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }
}

// Refreshes friendship code for requesting user, this give functionality to the refresh button on my friend code page.
const refreshFriendshipCode = async (req, res) => {
    try {
        const id = req.body.uid;
        const user = await User.findById(id);
        if (user) {
            const code = crypto.randomBytes(6).toString('hex');
            user.friendship_code = code;
            user.save();
            return res.status(200).json(user.friendship_code);
        }
        else return res.status(400).json("Could not find user"); 
    } catch (error) {
        res.status(400).json(error);  
    }
}

export { getMyFriendships, createNewFriendship, removeFriendship, refreshFriendshipCode };