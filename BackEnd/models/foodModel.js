import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    image:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
});

export const foodModel = mongoose.models.foods || mongoose.model("foods", foodSchema);