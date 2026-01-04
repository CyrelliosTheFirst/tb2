import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async() => {
    try {        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB CONNECTED SUCCESSFULLY!");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1) // exit with failure
}}