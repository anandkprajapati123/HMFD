import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://freshthali-food-del.netlify.app",
    "https://fresh-thali-food-del-admin.netlify.app"
  ],
  credentials: true
}));

// database connection
connectDB();

import path from "path";
import fs from "fs";

// api endpoints
app.use("/api/food", foodRouter);

// Smart image serving with fallback matching for different timestamps
app.get("/images/:filename", (req, res, next) => {
  const filename = req.params.filename;
  const uploadsDir = path.join(process.cwd(), "uploads");
  const filePath = path.join(uploadsDir, filename);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  // Fallback: If exact timestamp filename is missing, find any local file ending with food_X.png
  const baseNameMatch = filename.match(/(food_\d+\.\w+)$/i);
  if (baseNameMatch) {
    const suffix = baseNameMatch[1];
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      const matchingFile = files.find((f) => f.endsWith(suffix));
      if (matchingFile) {
        return res.sendFile(path.join(uploadsDir, matchingFile));
      }
    }
  }

  res.status(404).send("Image not found");
});

app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, () => {
  console.log(`Server is run on http://localhost:${PORT}`);
});
