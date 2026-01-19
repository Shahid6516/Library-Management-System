import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=>{
})


app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port " , PORT);
}); 
