import { foodModel } from "../models/foodModels.js";
import fs from 'fs';

//add food item
 const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        res.json({success:true, message:"food added"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:`${error}`})
    }
} 

//All foods
const allFoods = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods, message: "All foods fetched successfully" });
        return foods
    } catch (error) {
        res.status(500).json({ success: false, message: `Error: ${error.message}` });
        console.log(error);
    }
    
};

const removeFood = async (req,res)=>{
    try {
        const food =await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"food removed"});
    } catch (error) {
        res.json({success:false, message:"unable to remove food"});
        console.log(error);
    }
}

export {addFood, allFoods,removeFood};