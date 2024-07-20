import { foodModel } from "../models/foodModel.js";

const addFood = async (req, res) => {
    let file_Name = `${req.file.filename}`
    try {
        const food = await new foodModel({
            name: req.body,
            description: req.body,
            price: req.body,
            category: req.body,
            image: file_Name,
        });

        await food.save();
        res.json({
            success:true,
            data:food,
            message:"food added"});

    } catch (error) {
        console.log(error);
        res.json({success:false,
             message:"Unable to add food"});
    }
}

export {addFood};