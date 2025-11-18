// server/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import calcRoutes from "./routes/CalcRoute.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// =========================================================
// === 1. DEFINE API ROUTES FIRST ==========================
// =========================================================
app.use("/api/calculations", calcRoutes);


// =========================================================
// === 2. SERVE REACT APP (The "catch-all" handler) ========
// === THIS IS THE FINAL, GUARANTEED-TO-WORK VERSION ========
// =========================================================
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, '..', 'client', 'build');
  
  // Serve static files (JS, CSS, images) from the React build directory
  app.use(express.static(buildPath));

  // THE FIX:
  // Instead of app.get('*'), we use a final middleware to send the index.html
  // for any request that doesn't match an API route or a static file.
  // This bypasses the problematic routing library.
  app.use((req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// =========================================================
// === 3. START THE SERVER =================================
// =========================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));