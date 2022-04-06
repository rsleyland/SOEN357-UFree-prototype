import { Friendship } from "../models/Friendship.model.js";
import { User } from "../models/User.model.js";

const getMyFriendships = async (req, res) => {
    try {
        const id = req.body.uid;
        console.log(id)
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

const createNewFriendship = async (req, res) => {
    try {
        const id = req.body.uid;
        const name = req.body.name;
        const friendship_code = req.body.friendship_code;
        const friend = await User.findOne({friendship_code: friendship_code});
        if (friend) {
            const friendsId = friend._id;
            const friendshipExists = await Friendship.findOne({$or: [{friend_1_id: id, friend_2_id: friendsId}, {friend_1_id: friendsId, friend_2_id: id}]});
            if (friendshipExists) return res.status(400).json("Friendship already exists");
            else {
                const friendship = await Friendship.create({
                    friend_1_id: id, friend_1_name: name, friend_2_id: friendsId, friend_2_name: `${friend.firstName} ${friend.lastName}`})
                if (friendship) return res.status(200).json(friendship);
                else return res.status(400).json("Friendship could not be created");
            }
        }
        else return res.status(400).json("Could not find friends account"); 
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }
};

export { getMyFriendships, createNewFriendship };