import express from "express";
import Calculation from "../models/CalcModel.js";

const router = express.Router();

// Save calculation
router.post("/", async (req, res) => {
  const { expression, result } = req.body;
  const calc = new Calculation({ expression, result });
  await calc.save();
  res.json(calc);
});

// Get all calculations
router.get("/", async (req, res) => {
  const calcs = await Calculation.find().sort({ date: -1 });
  res.json(calcs);
});

export default router;
