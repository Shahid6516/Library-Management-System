import { TokenExpiredError } from "jsonwebtoken";
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issueDate: { type: Date, default: Date.now },
  dueDate: {
    type: Date,
    required: true,
    default: () => new Date(+new Date() + 14 * 24 * 60 * 60 * 1000), // Default 14 days
  },
  returnDate: { type: Date },
  status: {
    type: String,
    enum: ["issued", "returned", "overdue"],
    default: "issued",
  },
  fine: { type: Number, default: 0 },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
