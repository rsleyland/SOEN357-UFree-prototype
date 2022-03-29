import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}    
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
export { User };