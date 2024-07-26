import express from 'express';
import { PlaceOrder } from '../controllers/orderController.js';

export const orderRouter = express.Router();

orderRouter.post("/place", PlaceOrder);