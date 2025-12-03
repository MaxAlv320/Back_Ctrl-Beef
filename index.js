import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/config.js";
import userRoutes from "./Routes/user.routes.js";
import productRoutes from "./Routes/product.routes.js";
import itemRoutes from "./Routes/item.routes.js"
import cors from "cors";
import { verifyUserToken, verifyAdmin } from "./Helpers/jwt.helper.js";
//import { generateAppToken } from "./Helpers/jwt.helper.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    allowedHeaders: ["Authorization", "Content-Type", "x-app-token", "ngrok-skip-browser-warning"],
    credentials: true

}));
app.use(express.json());
connectDB();

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/items", itemRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//console.loapp.use("/api/items", itemRoutes);

console.log({ verifyUserToken, verifyAdmin });


