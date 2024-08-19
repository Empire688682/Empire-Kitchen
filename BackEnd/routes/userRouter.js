import express from 'express';
import { registerUser, loginUser, edditUserDetails } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/add", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/eddit", edditUserDetails);


export default userRouter