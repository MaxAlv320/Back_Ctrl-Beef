import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/config.js";
import userRoutes from "./Routes/user.routes.js";
import productRoutes from "./Routes/product.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
