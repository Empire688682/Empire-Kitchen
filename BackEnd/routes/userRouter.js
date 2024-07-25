import express from 'express';
import { addUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/add", addUser);
userRouter.post("/log", loginUser);


export default userRouter