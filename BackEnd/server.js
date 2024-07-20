import express from "express";
import cors from 'cors';
import {dbConnection} from "./dbConfig/dbConfig.js";
import foodRoute from "./routes/foodRouter.js";

const app = express();
const port = 6886;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/foods", foodRoute);

//DB connection
dbConnection();


app.get("/", (req, res) =>{
    res.send("App running");
});

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
});

