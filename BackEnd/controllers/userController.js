import { UserModel } from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs';

const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Log the request body
    console.log(req.body);

    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }
    try {
        const userExist = await UserModel.findOne({email});
        if (userExist) {
            return res.json({ success: false, message: "Email has been taken" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short" })
        };

        const passwordHashed = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name:name,
            email:email,
            password:passwordHashed
        });

        await user.save();
        return res.json({ success: true, message: "User added" });
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
};

const loginUser = async (req, res) => {

};

export { addUser, loginUser }