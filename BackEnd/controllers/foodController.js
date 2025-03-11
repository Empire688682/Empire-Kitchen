import { foodModel } from "../models/foodModel.js";
import { uploadImage } from "./storageController.js";
import fs from "fs"

const addFood = async (req, res) => {
    try {
        // Upload image to Cloudinary
        const imagePath = req.file.path
        const imageUrl = await uploadImage(imagePath);

        try {
            fs.unlinkSync(req.file.path);
        } catch (err) {
            console.warn("File already deleted or not found:", err.message);
        }
        
        // Create a new food item
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageUrl,
        });

        await food.save();
        res.json({
            success: true,
            data: food,
            message: "food added"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Unable to add food",
            error: error.message
        });
    }
};

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({
                success: false,
                message: "Food not found",
            });
        };
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "food remove"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Unable to remove food",
            error: error.message
        });
    }
};

const fetchFoods = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods,
            message: "food fetched successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Unable fetch food",
            error: error.message
        });
    }
}

export { addFood, removeFood, fetchFoods };