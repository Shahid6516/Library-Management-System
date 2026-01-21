import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// route

app.use("/api/auth", authRoute)


app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port " , PORT);
}); 
