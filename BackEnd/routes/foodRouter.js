import express from 'express';
import { addFood,removeFood,fetchFoods} from '../controllers/foodController.js';

const foodRoute = express.Router();


foodRoute.post("/add", addFood);
foodRoute.post("/remove", removeFood);
foodRoute.get("/food", fetchFoods);

export default foodRoute;