import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Library Management System Backend is running");
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
}); 
