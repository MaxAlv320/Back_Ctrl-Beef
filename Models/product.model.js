import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },          
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Hamburguesa", "Refresco", "Postre"],
    required: true
  },
  price: { type: Number, required: true },
  
 
  image: { type: String, required: true },

  available: { type: Boolean, default: true }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
