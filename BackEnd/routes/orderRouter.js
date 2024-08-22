import express from 'express';
import { PlaceOrder,fetchUserOrder,fetchAllOrder,remaoveDelOrder  } from '../controllers/orderController.js';

export const orderRouter = express.Router();

orderRouter.post("/place", PlaceOrder);
orderRouter.get("/orderId", fetchUserOrder);
orderRouter.get("/allorder", fetchAllOrder);
orderRouter.post("/removeorder", remaoveDelOrder);