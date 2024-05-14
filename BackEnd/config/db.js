import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

export const connectDB = async () =>{
 try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connection successful");
 } catch (error) {
  console.log("DB Connection", error);
 }
}