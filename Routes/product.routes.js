import express from "express";
import { verifyAppToken, verifyUserToken, verifyAdmin } from "../Helpers/jwt.helper.js";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/product.controller.js";

const router = express.Router();

// Rutas CRUD de productos
router.get("/", verifyAppToken, verifyUserToken, getProducts);
//router.get("/", verifyAppToken, getProducts)
router.post("/", verifyAppToken, verifyUserToken, verifyAdmin, createProduct);
router.put("/:id", verifyAppToken, verifyUserToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyAppToken, verifyUserToken, verifyAdmin, deleteProduct);

export default router;

