import express from "express";
import cors from 'cors';
import {dbConnection} from "./dbConfig/dbConfig.js";
import foodRoute from "./routes/foodRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const port = 6886;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/foods", foodRoute);
app.use("/images", express.static("upload"));
app.use("/api/users", userRouter);

//DB connection
dbConnection();


app.get("/", (req, res) =>{
    res.send("App running");
});

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
});

