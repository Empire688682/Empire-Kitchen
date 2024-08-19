import { UserModel } from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register function goes here
const registerUser = async (req, res) => {
    const { fName, lName, email, gender, password, dBirth } = req.body;
    try {
        if (!fName || !lName || !email || !gender || !password || !dBirth) {
            return res.json({ success: false, message: "All fields required" });
        }
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short" });
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const user = new UserModel({
            fName,
            lName,
            email,
            gender,
            dBirth,
            password: passwordHashed
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);
        return res.json({
            success: true,
            message: "User signed up",
            token,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Login function goes here
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //checking isUser
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.json({ success: false, message: "No user found" });
        }
        //checking isPasswordMatch
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.json({ success: false, message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);
        return res.json({ success: true, message: "User login", token, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
const edditUserDetails = async (req, res) => {
    const { userId, fName, lName, email, gender, dBirth } = req.body;
    try {
        if (!fName || !lName || !email || !gender || !dBirth) {
            return res.json({ success: false, message: "All fields required" });
        }
        //checking isUser
        const user = await UserModel.findOne({ _id:userId });
        if (!user) {
            res.json({ success: false, message: " You are Not Authorized" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        };

        user.fName = fName;
        user.lName = lName;
        user.gender = gender;
        user.gender = gender;
        user.dBirth = dBirth;

        await user.save();
        
        return res.json({
            success: true,
            message: "Save Changed",
            user
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { registerUser, loginUser, edditUserDetails };
