import { Friendship } from '../models/Friendship.model.js';
import { Schedule } from '../models/Schedule.model.js';

// Returns schedule from user sending request. req.body.uid is updated by middleware with users id which is stored inside the token cookie from the request.
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

// Save the passed schedule to the requesting user
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

// Returns friend's schedule matching friend_id. (has to be friend of requesting user)
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
        else res.status(400).json("You are not friends with that user"); 
         
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }
}

// Returns all friends schedules from user sending request.
const getFriendScheduleCompare = async (req, res) => {
    try {
        const id = req.body.uid;
        const returnSchedules = [];
        const friends = await Friendship.find({$or: [{friend_1_id: id}, {friend_2_id: id}]});
        let myName = '';

        for (let i in friends) {
            if (i==0) myName = friends[0].friend_1_id.toString() === id ? friends[0].friend_1_name : friends[0].friend_2_name;
            const friend_1_id = friends[i].friend_1_id.toString();
            const friend_2_id = friends[i].friend_2_id.toString();
            const friend_id = friend_1_id === id ? friend_2_id : friend_1_id;
            const friend_name = friend_1_id === id ? friends[i].friend_2_name : friends[i].friend_1_name;
            const friendSchedule = await Schedule.findOne({user: friend_id})
            if (friendSchedule) {
                returnSchedules.push({...friendSchedule._doc, name: friend_name});
            }
            else returnSchedules.push({user: friend_id, name: friend_name,  noSchedule: true});
        }
        const mySchedule = await Schedule.findOne({user: id})
        if (mySchedule) returnSchedules.push({...mySchedule._doc, name: myName});
        else returnSchedules.push({user: id, name: myName,  noSchedule: true});
        res.status(200).json(returnSchedules);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);  
    }
}

export { getMySchedule, saveMySchedule, getFriendSchedule, getFriendScheduleCompare };