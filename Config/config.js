import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { USR, PASSWORD, CLUSTER } = process.env;

// Construir dinámicamente el URI
const MONGO_URI = `mongodb+srv://${USR}:${PASSWORD}@${CLUSTER}/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado correctamente a MongoDB");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
