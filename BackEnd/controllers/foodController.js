import { foodModel } from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
    let file_Name = `${req.file.filename}`
    try {
        const food = new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:file_Name,
        });

        await food.save();
        res.json({
            success:true,
            data:food,
            message:"food added"});

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Unable to add food",
            error:error.message
    });
    }
};

const removeFood = async (req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        if(!food){
            return res.json({
                success:false,
                message:"Food not found",
        });
        } ;
        fs.unlink(`upload/${food.image}`, ()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message:"food remove"
    });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Unable to remove food",
            error:error.message
    });
    }
};

const fetchFoods = async (req,res) =>{
    try {
        const foods = await foodModel.findOne({});
        res.json({
            success:true,
            data:foods,
            message:"food fetched successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Unable fetch food",
            error:error.message
    });
    }
}

export {addFood,removeFood,fetchFoods};