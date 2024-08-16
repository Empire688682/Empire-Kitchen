import express from 'express';
import { addFood,removeFood,fetchFoods} from '../controllers/foodController.js';
import multer from 'multer';

const foodRoute = express.Router();

// storage Eng
const storage = multer.diskStorage({
    destination:"upload",
    filename: (req,file,cb)=>{
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage:storage});


foodRoute.post("/add", upload.single("image"), addFood);
foodRoute.post("/remove", removeFood);
foodRoute.get("/food", fetchFoods);

export default foodRoute;