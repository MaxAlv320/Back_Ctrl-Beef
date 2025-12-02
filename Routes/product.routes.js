import express from "express";
import { verifyAppToken } from "../Helpers/jwt.helper.js";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createManyProducts,   // <-- AGREGAR ESTO
} from "../Controllers/product.controller.js";

const router = express.Router();

// Rutas CRUD de productos
router.get("/", getProducts);
router.post("/", verifyAppToken, createProduct);
router.post("/bulk", verifyAppToken, createManyProducts); // <-- NUEVA RUTA
router.put("/:id", verifyAppToken, updateProduct);
router.delete("/:id", verifyAppToken, deleteProduct);

export default router;
