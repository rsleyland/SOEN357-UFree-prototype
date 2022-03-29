import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => console.log('Connected to Database successfully'));
mongoose.connection.on("error", (err) => console.log('Error connecting to Database - ', err.code));