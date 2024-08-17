import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fName:{type:String, required:true},
    lName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    gender:{type:String, required:true},
    password:{type:String, required:true},
    dBirth:{type:String, required:true},
});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema)