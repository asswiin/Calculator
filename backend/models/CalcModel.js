import mongoose from "mongoose";

const calcSchema = new mongoose.Schema({
  expression: String,
  result: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Calculation", calcSchema);
