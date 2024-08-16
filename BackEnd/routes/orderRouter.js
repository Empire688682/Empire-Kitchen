import express from 'express';
import { PlaceOrder,fetchUserOrder  } from '../controllers/orderController.js';

export const orderRouter = express.Router();

orderRouter.post("/place", PlaceOrder);
orderRouter.get("/orderId", fetchUserOrder);