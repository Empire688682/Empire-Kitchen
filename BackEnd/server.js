import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './route/foodRoute.js';

// app configuration
const app = express()
const port = 6886

//middleware
app.use(express.json())
app.use(cors())

 // db connection
 connectDB();

 //Api endpointt
 app.use("/api/food", foodRouter);
 app.use("/images", express.static("uploads"));

// Base endpoint
app.get("/", (req,res)=>{
    res.send("Api working");
})

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`);
})

//mongodb+srv://asehindej:asehindej@cluster0.mu1i7pc.mongodb.net/Empire