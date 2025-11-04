import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import calcRoutes from "./routes/CalcRoute.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/calculations", calcRoutes);

app.listen(5000,"0.0.0.0", () => console.log("Server running on port 5000"));
