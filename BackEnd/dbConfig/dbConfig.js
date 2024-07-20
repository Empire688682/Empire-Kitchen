import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

 export const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Db connected");
    } catch (error) {
        console.log(error);
    }
};