import express from "express";
import cors from 'cors';
import { dbConnection } from "./dbConfig/dbConfig.js";
import foodRoute from "./routes/foodRouter.js";
import userRouter from "./routes/userRouter.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { orderRouter } from "./routes/orderRouter.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 6886;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Add both frontend and admin panel domains
    credentials: true // Allows cookies to be sent
}));


// Routes
app.use("/api/foods", foodRoute);
app.use("/images", express.static("upload"));
app.use("/api/users", userRouter);
app.use("/api/order", orderRouter);

// DB connection
dbConnection();

app.get("/", (req, res) => {
    res.send("App running");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});
