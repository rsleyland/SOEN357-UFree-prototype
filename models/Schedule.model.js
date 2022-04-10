import mongoose from 'mongoose';

const ScheduleSchema = mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    data : []
}, {timestamps: true});


const Schedule = mongoose.model("Schedule", ScheduleSchema);

export { Schedule };