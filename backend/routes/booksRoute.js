import express from "express";
import { addBook, getAllBooks } from "../controllers/bookController";

const router = express.Router();

router.post("/add", addBook);
router.get("/all", getAllBooks);

export default router;
