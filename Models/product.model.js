import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Ej: "Hamburguesa doble"
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Classic", "Special", "Vegetarian", "Combo"],
    required: true
  },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true } // Disponible o no
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
