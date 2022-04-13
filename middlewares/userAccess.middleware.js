import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

// Middleware to grab http only cookie, verify JWT token and set the req.body.uid to the user id from the JWT result.
const userRoute = async (req, res, next) => {
    try {
        const result = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const user = await User.findById(result._id);
        if (!user) throw "User does not exist";
        if (user.email !== result.email) throw "User is incorrect";
        req.body.uid = result._id;
        next();
    } catch (error) {
        res.status(400).json({error});
    }
};

export { userRoute };