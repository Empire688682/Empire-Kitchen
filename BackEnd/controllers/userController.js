import { UserModel } from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//token function goes here
const createToken = (id) =>{
    return jwt.sign({id}, process.env.TOKEN_KEY);
}

// register function goes here
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.json({ success: false, message: "User exist" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short" });
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name: name,
            email: email,
            password: passwordHashed
        });

        const userName = await user.save();
        const token = createToken(userName._id);
        return res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Login function goes here
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        //checking isUser
        const user = await UserModel.findOne({email});
        if(!user){
            res.json({ success: false, message: "No user found" });
        }
        //checking isPasswordMatch
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.json({ success: false, message: "Incorrect password" });
        }
        
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { registerUser, loginUser };
