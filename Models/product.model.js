import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ["Classic", "Special", "Vegetarian", "Combo"],
    required: true
  },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },

}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);


