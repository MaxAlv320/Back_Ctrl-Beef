import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/config.js";
import userRoutes from "./Routes/user.routes.js";
import productRoutes from "./Routes/product.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

