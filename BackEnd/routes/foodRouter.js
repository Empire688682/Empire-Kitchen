import express from 'express';
import { addFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRoute = express.Router();

// storage Eng
const storage = multer.diskStorage({
    destination:"upload",
    filename: (req,file,cb)=>{
        return cb(null, `${Date.now()}_${file.filename}`);
    }
});

const upload = multer({storage:storage});


foodRoute.post("/add", upload.single("image"), addFood);

export default foodRoute;