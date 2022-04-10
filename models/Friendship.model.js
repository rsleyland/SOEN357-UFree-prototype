import mongoose from "mongoose";

const FriendshipSchema = mongoose.Schema({

    friend_1_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    friend_1_name: { type: String, required: true},
    friend_2_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    friend_2_name: { type: String, required: true}

}, {timestamps: true});

const Friendship = mongoose.model('Friendship', FriendshipSchema);

export { Friendship };