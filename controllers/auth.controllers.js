import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto";

// Handler for login post request. Uses JWT token inside of http only cookie (We use this cookie in middlewares to verify the user for secure routes)
// Users friendship code is refreshed at login (used to add friends. Refreshes to prevent it from being 'leaked')
const loginHandler = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)){
                const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '30d'});
                const options = {
                    httpOnly: true,
                    expires: new Date(Date.now() + parseInt(process.env.EXPIRE_TOKEN)) 
                };
                const code = crypto.randomBytes(6).toString('hex');
                user.friendship_code = code;
                user.save();
                res.status(200).cookie('token', token, options).json({
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName, 
                        lastName: user.lastName,
                        friendship_code: user.friendship_code
                    });
            }
            else throw "Password incorrect";
        }
        else throw "User not found";
    } catch (error) {
        res.status(400).json({error});
    }
};

// Handler for logout get request. Serves purpose of removing cookie from client. (Cleanup)
const logoutHandler = async (req, res) => {
    try {
        res.status(200).clearCookie("token").end();
    } catch (error) {
        res.status(400).json({error});
    }
};

// Handler for registering new user. Checks that email is not currently registered. Uses bcrypt to hash users password for storing in MongoDB 
const registrationHandler = async (req, res) => {
    try {
        if (await User.count({email: req.body.email}) > 0) {
            throw new Error("User already exists with this email");
        };
        req.body.password = req.body.password.length > 0 ? await bcrypt.hash(req.body.password, 12) : '';   // HASHING USERS PASSWORD BEFORE STORE IN DB
        const code = crypto.randomBytes(6).toString('hex');
        req.body.friendship_code = code;
        const newUser = await User.create(req.body);
        if (newUser) return res.status(200).json({message: `Success - new user created`});
        else return res.status(400).json({message: `Failure - new user could not be created`});
    } 
    catch (error) {           //ERROR DETAILS PASSED TO FRONTEND
        if (error.errors) {
            let errs = [];
            for (let err in error.errors) { 
                errs.push({name: error.errors[err].path, error: error.errors[err].kind});
            }
            //Errors from mongoose validation
            res.status(400).json(errs);
        }
        //Custom thrown errors
        else res.status(400).json(error.message);   
    }
};


export { loginHandler, registrationHandler, logoutHandler };