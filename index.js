import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/config.js";

dotenv.config();
const app = express();

connectDB(); // conecta con MongoDB

app.get("/", (req, res) => res.send("Servidor funcionando"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
