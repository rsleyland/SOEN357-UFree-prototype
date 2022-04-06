import { Friendship } from '../models/Friendship.model.js';
import { Schedule } from '../models/Schedule.model.js';

const getMySchedule = async (req, res) => {
    try {
        const id = req.body.uid;
        const mySchedule = await Schedule.findOne({user: id})
        if (mySchedule) {
            res.status(200).json(mySchedule);  
        }
        else res.status(200).json("User schedule not found");  
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }

};

const saveMySchedule = async (req, res) => {
    try {
        const id = req.body.uid;
        const schedule = req.body.schedule;
        let mySchedule = await Schedule.findOneAndUpdate({user: id}, {data: schedule}, {new: true});
        if (mySchedule) return res.status(200).json(mySchedule);
        else mySchedule = await Schedule.create({user: id, data: schedule})
        if (mySchedule) return res.status(200).json(mySchedule);  
        else res.status(400).json("User schedule could not be created");  
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }
};

const getFriendSchedule = async (req, res) => {
    try {
        const id = req.body.uid;
        const friend_id = req.body.friend_id;
        const friendshipExists = await Friendship.findOne(
            {$or: [{friend_1_id: id, friend_2_id: friend_id}, {friend_1_id: friend_id, friend_2_id: id}]});
        if (friendshipExists) {
            const friendSchedule = await Schedule.findOne({user: friend_id})
            if (friendSchedule) {
                res.status(200).json(friendSchedule);  
            }
            else res.status(200).json("Friends schedule not found"); 
        }
        else res.status(200).json("You are not friends with that user"); 
         
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }
}

export { getMySchedule, saveMySchedule, getFriendSchedule };