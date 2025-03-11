import express from 'express';
import { addFood,removeFood,fetchFoods} from '../controllers/foodController.js';
import multer from "multer";
import fs from "fs";

const foodRoute = express.Router();

const uploadDir = "uploads";
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
};
const storage = multer.diskStorage({
    destination: "uploads/",
    filename : (req, file, cb) =>{
        return cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({storage:storage});

foodRoute.post("/add", upload.single("image") ,addFood);
foodRoute.post("/remove", removeFood);
foodRoute.get("/food", fetchFoods);

export default foodRoute;