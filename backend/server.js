import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

// app config
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(cors());

// database connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, () => {
  console.log(`Server is run on http://localhost:${PORT}`);
});
